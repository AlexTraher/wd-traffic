import { test, expect } from '@playwright/test';

test('Loads the page correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle(/Wave Digital Traffic/);
  await expect(page.getByLabel('Map', { exact: true })).toBeInViewport();
  await expect(page.getByTestId('incident-list')).toBeInViewport();
});

test('It displays a tooltip for an incident when clicked from the menu', async ({ page }) => {
  await page.goto('http://localhost:5173');


  await expect(page.getByRole('dialog')).not.toBeVisible();

  await page.getByTestId(/incident-list-item-button-4515505/).click();

  await expect(page.getByRole('dialog').getByText(/Kilberry Cr, Hallam/)).toBeVisible();
});

test('It filters the incident list when the map is panned', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByTestId(/incident-list-item-button-4515505/)).toBeVisible();
  await expect(page.getByLabel('Map', { exact: true })).toBeInViewport();

  await expect(await page.getByTestId(/incident-list-item-button/).count()).toEqual(588);

  await page.getByTitle(/Zoom in/).click();
  await page.waitForTimeout(100); // not ideal delay - but google is doing something odd with their event capturing
  await page.getByTitle(/Zoom in/).click();


  await expect(await page.getByTestId(/incident-list-item-button/).count()).toEqual(512);
});
