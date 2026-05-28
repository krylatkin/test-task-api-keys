import { expect, test } from '@playwright/test';
import { freezeTime, gotoApiKeysPage } from './helpers/apiKeys';

test.beforeEach(async ({ page }) => {
  await freezeTime(page);
});

test('API keys page matches the reference layout', async ({ page }) => {
  await gotoApiKeysPage(page);

  await expect(page).toHaveScreenshot('api-keys-page.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});
