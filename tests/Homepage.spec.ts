import { test, expect } from '@playwright/test';
const MAIN_URL = 'https://testautomationpractice.blogspot.com/';
test('Top Nav • Home', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Click Home
  await page.locator('#PageList2').getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Sanity: "Pages" widget is visible on Home
  await expect(page.locator('#PageList2')).toBeVisible();
  await page.close();
});

test('Top Nav • Udemy Courses', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Click Udemy Courses
  await page.locator('#PageList2').getByRole('link', { name: 'Udemy Courses', exact: true }).click();
  await expect(page).toHaveURL(/pavanonlinetrainings\.com\/p\/udemy-courses/i);

  // Go back to Home
  await page.goBack();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);
  await expect(page.locator('#PageList2')).toBeVisible();
  await page.close();
});

test('Top Nav • Online Trainings', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Click Online Trainings
  await page.locator('#PageList2').getByRole('link', { name: 'Online Trainings', exact: true }).click();
  await expect(page).toHaveURL(/pavanonlinetrainings\.com\/?$/i);

  // Go back to Home
  await page.goBack();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);
  await expect(page.locator('#PageList2')).toBeVisible();
  await page.close();
});

test('Top Nav • Blog', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Click Blog
  await page.locator('#PageList2').getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page).toHaveURL(/pavantestingtools\.com\/?$/i);

  // Go back to Home
  await page.goBack();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);
  await expect(page.locator('#PageList2')).toBeVisible();
  await page.close();
});

test('Top Nav • PlaywrightPractice', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);

  // Click PlaywrightPractice
  await page.locator('#PageList2').getByRole('link', { name: 'PlaywrightPractice', exact: true }).click();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/p\/playwrightpractice\.html$/i);

  // Go back to Home
  await page.goBack();
  await expect(page).toHaveURL(/testautomationpractice\.blogspot\.com\/?$/i);
  await expect(page.locator('#PageList2')).toBeVisible();
  await page.close();
});
