import { expect, test } from '@playwright/test'
import {
  freezeTime,
  getApiKeyItem,
  getCreateButton,
  gotoApiKeysPage,
  openActionsMenu,
} from './helpers/apiKeys'

test.beforeEach(async ({ page }) => {
  await freezeTime(page)
  await gotoApiKeysPage(page)
})

test('creates a new API key', async ({ page }, testInfo) => {
  const projectName = testInfo.project.name

  await getCreateButton(page, projectName).click()

  const newKeyItem = getApiKeyItem(page, 'new_api_key_5', projectName)
  await expect(newKeyItem).toBeVisible()

  if (projectName === 'desktop') {
    await expect(newKeyItem).toContainText('Active')
  }
})

test('renames an API key from the actions menu', async ({ page }, testInfo) => {
  const projectName = testInfo.project.name
  const originalName = 'model_training_key'
  const updatedName = 'model_training_key_prod'

  const menu = await openActionsMenu(page, originalName, projectName)
  await menu.getByRole('menuitem', { name: 'Edit' }).click()

  const dialog = page.getByRole('dialog', { name: 'Edit' })
  await expect(dialog).toBeVisible()
  await dialog.getByLabel('Name').fill(updatedName)
  await dialog.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByRole('dialog', { name: 'Edit' })).toBeHidden()
  await expect(getApiKeyItem(page, updatedName, projectName)).toBeVisible()
  await expect(getApiKeyItem(page, originalName, projectName)).toHaveCount(0)
})

test('disables and re-enables an API key', async ({ page }, testInfo) => {
  const projectName = testInfo.project.name
  const name = 'ai_inference_key'

  let menu = await openActionsMenu(page, name, projectName)
  await menu.getByRole('menuitem', { name: 'Disable' }).click()

  menu = await openActionsMenu(page, name, projectName)
  await expect(menu.getByRole('menuitem', { name: 'Enable' })).toBeVisible()

  if (projectName === 'desktop') {
    await expect(getApiKeyItem(page, name, projectName)).toContainText('Revoked')
  }

  await menu.getByRole('menuitem', { name: 'Enable' }).click()

  menu = await openActionsMenu(page, name, projectName)
  await expect(menu.getByRole('menuitem', { name: 'Disable' })).toBeVisible()

  if (projectName === 'desktop') {
    await expect(getApiKeyItem(page, name, projectName)).toContainText('Active')
  }
})

test('deletes an API key from the list', async ({ page }, testInfo) => {
  const projectName = testInfo.project.name
  const name = 'vision_model_key_v1'

  const menu = await openActionsMenu(page, name, projectName)
  await menu.getByRole('menuitem', { name: 'Delete' }).click()

  await expect(getApiKeyItem(page, name, projectName)).toHaveCount(0)
})

test('selects a different card on mobile', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only card interaction.')

  const initialCard = getApiKeyItem(page, 'ai_inference_key', testInfo.project.name)
  const targetCard = getApiKeyItem(page, 'model_training_key', testInfo.project.name)

  await expect(initialCard).toHaveAttribute('data-selected', 'true')
  await expect(targetCard).toHaveAttribute('data-selected', 'false')

  await targetCard.locator('.card__trigger').click()

  await expect(initialCard).toHaveAttribute('data-selected', 'false')
  await expect(targetCard).toHaveAttribute('data-selected', 'true')
})
