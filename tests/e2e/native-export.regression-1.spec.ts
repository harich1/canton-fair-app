import { expect, test } from "@playwright/test";

test("loads the native bridge from a production-safe JavaScript path", async ({
  page,
}) => {
  await page.goto("./");

  const nativeBridgeSources = await page
    .locator('script[src*="native-export"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => script.getAttribute("src") ?? ""),
    );

  expect(nativeBridgeSources).toHaveLength(1);
  expect(new URL(nativeBridgeSources[0], page.url()).pathname).toBe(
    "/canton-fair-app/native-export.js",
  );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          typeof (
            window as typeof window & {
              FairNoteNative?: unknown;
            }
          ).FairNoteNative,
      ),
    )
    .toBe("object");
});

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
