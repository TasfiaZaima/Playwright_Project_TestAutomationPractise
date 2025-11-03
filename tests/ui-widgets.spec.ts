import { test, expect } from '@playwright/test';

test('When user interacts with all widgets, Then actions succeed', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('Playwright project');
  await page.locator('input[type="submit"]').click();
  await page.getByText('No results found.').click();
  await page.getByRole('button', { name: 'START' }).click();
  await page.getByRole('button', { name: 'STOP' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Simple Alert' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Confirmation Alert' }).click();
  await page.getByText('You pressed Cancel!').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Hidden Elements & AJAX' }).click();
  await page.getByRole('button', { name: 'Prompt Alert' }).click();
  await page.getByText('User cancelled the prompt.').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Popup Windows' }).click();
  // const page3 = await page3Promise;
  // await page.getByRole('link', { name: 'Mobiles' }).click();
  // await page.getByRole('link', { name: 'Laptops' }).click();
  await page.getByRole('button', { name: 'Copy Text' }).click();
  await page.getByRole('button', { name: 'Copy Text' }).dblclick();
  await page.getByText('Field1: Field2: Copy Text').click();
  await page.getByText('Drag me to my target').click();
  await page.locator('#slider-range span').first().click();
  await page.locator('#slider-range span').nth(1).click();
  await page.locator('#slider-range').click();
});