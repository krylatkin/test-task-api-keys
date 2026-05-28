import { expect, test } from '@playwright/test'

const frozenTime = '2026-05-28T12:00:00.000Z'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(({ now }) => {
    const RealDate = Date
    const fixedTime = new RealDate(now).valueOf()

    class MockDate extends RealDate {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedTime)
          return
        }

        super(...args)
      }

      static now() {
        return fixedTime
      }
    }

    Object.defineProperty(window, 'Date', {
      configurable: true,
      writable: true,
      value: MockDate,
    })
  }, { now: frozenTime })
})

test('API keys page matches the reference layout', async ({ page }) => {
  await page.goto('/')

  await page.waitForFunction(() => {
    const isLoading = document.querySelector('.loading-state') !== null
    const hasRows = document.querySelectorAll('.api-table__row, .card').length > 0

    return !isLoading && hasRows
  })

  await expect(page).toHaveScreenshot('api-keys-page.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  })
})
