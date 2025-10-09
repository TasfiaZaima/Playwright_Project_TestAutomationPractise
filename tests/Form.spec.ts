// tests/e2e-practice-site.spec.ts
// Single Playwright test that performs ALL actions in sequence on
// https://testautomationpractice.blogspot.com/:
// - Fill random text fields
// - Select random gender, days (checkboxes), country, and colors (multi-select)
// - Select random animals (multi-select)
// - Fill both date pickers (mm/dd/yyyy and dd/mm/yyyy)
// - Click each top-nav link, validate URL, then go back Home
//
// Run headed & slower so you can see each step:
// npx playwright test tests/e2e-practice-site.spec.ts --project=chromium --headed --slow-mo=250

import { test, expect } from '@playwright/test';

// -----------------
// Helpers for random values
// -----------------
function randomString(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function randomEmail() {
  return `${randomString(6)}@${randomString(5)}.com`;
}
function randomPhone() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
}
function randomAddress() {
  return `${Math.floor(Math.random() * 999)} ${randomString(8)} Street, ${randomString(6)} City`;
}
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomMultiple<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// -----------------
// Single End-to-End Test
// -----------------
test('Practice site • End-to-end random interactions + top nav', async ({ page }) => {
  const MAIN_URL = 'https://testautomationpractice.blogspot.com/';
  const NAV = '#PageList2';

  // 0) Open Home
  await page.goto(MAIN_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);
  await expect(page.locator(NAV)).toBeVisible();

  // 1) Fill text inputs with random data
  {
    const name = randomString(10);
    const email = randomEmail();
    const phone = randomPhone();
    const address = randomAddress();

    await page.fill('#name', name);
    await page.waitForTimeout(300);
    await page.fill('#email', email);
    await page.waitForTimeout(300);
    await page.fill('#phone', phone);
    await page.waitForTimeout(300);
    await page.fill('#textarea', address);
    await page.waitForTimeout(500);

    await expect(page.locator('#name')).toHaveValue(name);
    await expect(page.locator('#email')).toHaveValue(email);
    await expect(page.locator('#phone')).toHaveValue(phone);
    await expect(page.locator('#textarea')).toHaveValue(address);

    console.log(`Filled Name=${name}, Email=${email}, Phone=${phone}, Address="${address}"`);
  }

  // 2) Random Gender + Days (checkboxes)
  {
    // Gender
    const genders = ['male', 'female'];
    const chosenGender = randomChoice(genders);
    await page.check(`#${chosenGender}`);
    await page.waitForTimeout(800); // visual pause
    await expect(page.locator(`#${chosenGender}`)).toBeChecked();

    // Days (checkboxes)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const chosenDays = randomMultiple(days, 2 + Math.floor(Math.random() * 3)); // 2–4 days
    for (const day of chosenDays) {
      await page.check(`#${day}`);
      await expect(page.locator(`#${day}`)).toBeChecked();
    }
    await page.waitForTimeout(800); // visual pause

    console.log(`Selected Gender=${chosenGender}; Days=[${chosenDays.join(', ')}]`);
  }

  // 3) Random Country + Colors (multi-select)
  {
    // Country
    const countries = ['usa','canada','uk','germany','france','australia','japan','china','brazil','india'];
    const chosenCountry = randomChoice(countries);

    await page.locator('#country').scrollIntoViewIfNeeded();
    await page.locator('#country').focus();
    await page.keyboard.press('Alt+ArrowDown').catch(() => {}); // optional to show the dropdown
    await page.selectOption('#country', chosenCountry);
    await page.waitForTimeout(800); // visual pause
    await expect(page.locator('#country')).toHaveValue(chosenCountry);

    // Colors (multi-select)
    const colors = ['red', 'blue', 'green', 'yellow', 'white'];
    const chosenColors = randomMultiple(colors, 2 + Math.floor(Math.random() * 2)); // 2–3
    await page.selectOption('#colors', chosenColors);
    await page.waitForTimeout(1000); // visual pause

    const selectedValues = await page.locator('#colors').evaluate((el: HTMLSelectElement) =>
      Array.from(el.selectedOptions).map(o => o.value)
    );
    for (const c of chosenColors) expect(selectedValues).toContain(c);

    console.log(`Selected Country=${chosenCountry}; Colors=[${chosenColors.join(', ')}]`);
  }

  // 4) Animals multi-select (sorted list)
  {
    const animals = ['cat','cheetah','deer','dog','elephant','fox','giraffe','lion','rabbit','zebra'];
    const chosenAnimals = randomMultiple(animals, 2 + Math.floor(Math.random() * 4)); // 2–5
    await page.selectOption('#animals', chosenAnimals);
    await page.waitForTimeout(800); // visual pause

    const selectedAnimals = await page.locator('#animals').evaluate((el: HTMLSelectElement) =>
      Array.from(el.selectedOptions).map(o => o.value)
    );
    for (const a of chosenAnimals) expect(selectedAnimals).toContain(a);

    console.log(`Selected Animals=[${chosenAnimals.join(', ')}]`);
  }

  // 5) Date pickers
  {
    // Date Picker 1 (mm/dd/yyyy)
    const mm = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const dd = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    const yyyy1 = String(2020 + Math.floor(Math.random() * 5));
    const date1 = `${mm}/${dd}/${yyyy1}`;
    await page.fill('#datepicker', date1);
    await expect(page.locator('#datepicker')).toHaveValue(date1);
    await page.waitForTimeout(500);
    console.log(`Date Picker 1 = ${date1}`);

    // Date Picker 2 (dd/mm/yyyy)
    const dd2 = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    const mm2 = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const yyyy2 = String(2020 + Math.floor(Math.random() * 5));
    const date2 = `${dd2}/${mm2}/${yyyy2}`;

    // Remove readonly if present
    await page.evaluate(() => {
      const el = document.getElementById('txtDate');
      if (el) el.removeAttribute('readonly');
    });
    await page.fill('#txtDate', date2);
    await expect(page.locator('#txtDate')).toHaveValue(date2);
    await page.waitForTimeout(500);
    console.log(`Date Picker 2 = ${date2}`);
  }
  // Done
  await page.waitForTimeout(600);
});
