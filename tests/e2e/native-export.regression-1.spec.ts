import { expect, test } from "@playwright/test";

test("uses the Android share bridge for FairNote backup files", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_lang", "en");
    localStorage.setItem("pwa_dismissed", "1");
  });
  await page.goto("./");

  await page.evaluate(() => {
    const testWindow = window as typeof window & {
      __nativeExport?: { name: string; type: string; size: number };
      FairNoteNative?: {
        isNative: boolean;
        exportBlob: (blob: Blob, fileName: string) => Promise<string>;
      };
    };
    testWindow.FairNoteNative = {
      isNative: true,
      async exportBlob(blob, fileName) {
        testWindow.__nativeExport = {
          name: fileName,
          type: blob.type,
          size: blob.size,
        };
        return `content://fairnote/${fileName}`;
      },
    };
  });

  await page.locator('button[onclick="openSettings()"]').click();
  await page.locator("#btnBackup").click();

  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (
            window as typeof window & {
              __nativeExport?: { name: string; type: string; size: number };
            }
          ).__nativeExport,
      ),
    )
    .toMatchObject({
      name: expect.stringMatching(/^FairNote_backup_.*\.fairnote$/),
      type: "application/x-fairnote-backup",
      size: expect.any(Number),
    });
});
