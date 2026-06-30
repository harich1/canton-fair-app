import { expect, test } from "@playwright/test";

test("associates capture labels with their form controls", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cf_onboarding_complete", "1");
    localStorage.setItem("cf_lang", "en");
    localStorage.setItem("pwa_dismissed", "1");
  });
  await page.goto("./");
  await page.locator("#fab").click();

  const associations = [
    ["#lBooth", "fBooth"],
    ["#lName", "fName"],
    ["#lPrice", "fPrice"],
    ["#lDelivery", "fDelivery"],
    ["#lPackaging", "fPackaging"],
    ["#lContact", "fContact"],
    ["#lNotes", "fNotes"],
  ] as const;

  for (const [label, controlId] of associations) {
    await expect(page.locator(label)).toHaveAttribute("for", controlId);
  }
});
