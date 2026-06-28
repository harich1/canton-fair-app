import { expect, test } from "@playwright/test";

test("starts locally without asking for an account or PIN", async ({ page }) => {
  await page.goto("./");

  await expect(page.locator("#nameOverlay")).toHaveClass(/open/);
  await expect(page.locator("#nameInput")).toBeHidden();
  await expect(page.locator("#pinInput")).toBeHidden();
  await expect(page.locator("#nameStartBtn")).toBeVisible();

  await page.locator("#nameStartBtn").click();

  await expect(page.locator("#nameOverlay")).not.toHaveClass(/open/);
  const credentials = await page.evaluate(() => ({
    user: localStorage.getItem("cf_user"),
    pin: localStorage.getItem("cf_pin"),
  }));
  expect(credentials).toEqual({ user: null, pin: null });
});

test("saves a product locally and restores it after reload", async ({ page }) => {
  await page.addInitScript(() => {
    const event = {
      id: "event-e2e",
      name: "E2E Fair",
      createdAt: "2026-06-28T00:00:00.000Z",
    };

    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_lang", "en");
    localStorage.setItem("cf_events", JSON.stringify([event]));
    localStorage.setItem("cf_current_event", event.id);
    localStorage.setItem("pwa_dismissed", "1");
  });

  await page.goto("./");
  await expect(page.locator("#fab")).toBeEnabled();

  await page.locator("#fab").click();
  await expect(page.locator("#fBooth")).toBeFocused();
  await page.locator("#fBooth").fill("A-101");
  await page.locator("#fName").fill("Portable sample");
  await page.locator("#fPrice").fill("$12.50");
  await page.locator("#fDelivery").fill("Courier");
  await page.locator("#fPackaging").fill("12/carton");
  await page.locator("#fBusinessCardGallery").setInputFiles({
    name: "business-card.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await expect(page.locator("#businessCardGrid .photo-item")).toHaveCount(1);
  await page.locator("#saveBtn").click();

  await expect(page.locator(".card-name")).toHaveText("Portable sample");
  await expect(page.locator(".card-price")).toHaveText("$12.50");
  await expect(page.locator(".card-tags")).toContainText("Delivery Courier");
  await expect(page.locator(".card-tags")).toContainText("Pack 12/carton");
  await expect(page.locator(".card-tags")).toContainText("Card 1");

  await page.reload();

  await expect(page.locator(".card-name")).toHaveText("Portable sample");
  await expect(page.locator(".card-tags")).toContainText("Card 1");
});

test("supports Simplified Chinese and optional item fields", async ({ page }) => {
  await page.addInitScript(() => {
    const event = {
      id: "event-zh",
      name: "广州交易会",
      createdAt: "2026-06-28T00:00:00.000Z",
    };
    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_lang", "zh");
    localStorage.setItem("cf_events", JSON.stringify([event]));
    localStorage.setItem("cf_current_event", event.id);
  });

  await page.goto("./");
  await expect(page.locator("#fab")).toContainText("快速记录");

  await page.locator("#fab").click();
  await expect(page.locator("#modalTitle")).toHaveText("添加商品");
  await page.locator("#saveBtn").click();

  await expect(page.locator(".card-name")).toHaveText("未命名商品");
});

test("shows fields for the selected fair template", async ({ page }) => {
  await page.addInitScript(() => {
    const event = {
      id: "event-consumer",
      name: "Consumer Fair",
      templateId: "consumer",
      createdAt: "2026-06-28T00:00:00.000Z",
    };
    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_lang", "en");
    localStorage.setItem("cf_events", JSON.stringify([event]));
    localStorage.setItem("cf_current_event", event.id);
  });

  await page.goto("./");
  await page.locator("#fab").click();
  await expect(page.locator("#fBooth")).toBeFocused();

  await expect(page.locator("#fDomesticDeliveryFee")).toBeVisible();
  await expect(page.locator("#fMinimumOrder")).toBeVisible();
  await expect(page.locator("#fMoq")).toBeHidden();
  await expect(page.locator("#fSpecification")).toBeHidden();

  await page.locator("#fDomesticDeliveryFee").fill("3000");
  await page.locator("#fMinimumOrder").fill("10");
  await page.locator("#fVatIncluded").evaluate((element: HTMLInputElement) => {
    element.checked = true;
    element.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await page.locator("#saveBtn").click();

  const saved = await page.evaluate(
    () =>
      new Promise<{
        domesticDeliveryFee: string;
        minimumOrder: string;
        vatIncluded: boolean;
      }>((resolve, reject) => {
        const request = indexedDB.open("cf_guest", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const getAll = database
            .transaction("p", "readonly")
            .objectStore("p")
            .getAll();
          getAll.onerror = () => reject(getAll.error);
          getAll.onsuccess = () => {
            const product = getAll.result[0];
            database.close();
            resolve({
              domesticDeliveryFee: product.domesticDeliveryFee,
              minimumOrder: product.minimumOrder,
              vatIncluded: product.vatIncluded,
            });
          };
        };
      }),
  );

  expect(saved).toEqual({
    domesticDeliveryFee: "3000",
    minimumOrder: "10",
    vatIncluded: true,
  });
});

test("reopens the app shell while offline", async ({ context, page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cf_onboarding_complete", "1");
  });

  await page.goto("./");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();

  await context.setOffline(true);
  await page.reload();

  await expect(page.locator("#fab")).toBeEnabled();
  await expect(page.locator(".header-sub")).toHaveText("FairNote");

  await context.setOffline(false);
});

test("backs up and migrates legacy products before assigning an event", async ({
  page,
}) => {
  await page.goto("./");

  await page.evaluate(async () => {
    const event = {
      id: "event-migration",
      name: "Migration Fair",
      createdAt: "2026-06-28T00:00:00.000Z",
    };
    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_events", JSON.stringify([event]));
    localStorage.setItem("cf_current_event", event.id);

    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("cf_guest", 2);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("p")) {
          database.createObjectStore("p", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        if (!database.objectStoreNames.contains("meta")) {
          database.createObjectStore("meta", { keyPath: "key" });
        }
      };
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction(
          ["p", "meta"],
          "readwrite",
        );
        transaction.objectStore("p").clear();
        transaction.objectStore("meta").clear();
        transaction.objectStore("p").put({
          id: 1,
          booth: "LEGACY-1",
          name: "Legacy sample",
          photos: [],
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
        });
        transaction.oncomplete = () => {
          database.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      };
    });
  });

  await page.reload();
  await expect(page.locator(".card-name")).toHaveText("Legacy sample");

  const migration = await page.evaluate(
    () =>
      new Promise<{
        eventId: string;
        backupName: string;
        completed: boolean;
      }>((resolve, reject) => {
        const request = indexedDB.open("cf_guest", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction(
            ["p", "meta"],
            "readonly",
          );
          const productRequest = transaction.objectStore("p").get(1);
          const backupRequest = transaction
            .objectStore("meta")
            .get("backup-before-product-events-v2");
          const completedRequest = transaction
            .objectStore("meta")
            .get("migration-product-events-v2");
          transaction.oncomplete = () => {
            database.close();
            resolve({
              eventId: productRequest.result.eventId,
              backupName: backupRequest.result.products[0].name,
              completed: completedRequest.result.value,
            });
          };
          transaction.onerror = () => reject(transaction.error);
        };
      }),
  );

  expect(migration).toEqual({
    eventId: "event-migration",
    backupName: "Legacy sample",
    completed: true,
  });
});
