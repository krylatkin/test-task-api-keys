import { expect, type Locator, type Page } from '@playwright/test';

export const frozenTime = '2026-05-28T12:00:00.000Z';

export async function freezeTime(page: Page) {
  await page.addInitScript(
    ({ now }) => {
      const RealDate = Date;
      const fixedTime = new RealDate(now).valueOf();

      class MockDate extends RealDate {
        constructor(...args: any[]) {
          // eslint-disable-line @typescript-eslint/no-explicit-any
          if (args.length === 0) {
            super(fixedTime);
            return;
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          super(...args);
        }

        static now() {
          return fixedTime;
        }
      }

      Object.defineProperty(window, 'Date', {
        configurable: true,
        writable: true,
        value: MockDate,
      });
    },
    { now: frozenTime },
  );
}

export async function gotoApiKeysPage(page: Page) {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'API keys' })).toBeVisible();

  await page.waitForFunction(() => {
    const isLoading = document.querySelector('.loading-state') !== null;
    const hasRows =
      document.querySelectorAll('.api-table__row, .card').length > 0;

    return !isLoading && hasRows;
  });
}

function escapeForRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getCreateButton(page: Page, projectName: string) {
  if (projectName === 'mobile') {
    return page.locator('.mobile-create');
  }

  return page.locator('.page-header > .page-header__primary-action');
}

export function getApiKeyItem(
  page: Page,
  name: string,
  projectName: string,
): Locator {
  const nameMatcher = new RegExp(`^${escapeForRegex(name)}$`);

  if (projectName === 'mobile') {
    return page
      .locator('.card')
      .filter({
        has: page.locator('.card__title-name', { hasText: nameMatcher }),
      })
      .first();
  }

  return page
    .locator('.api-table__row')
    .filter({ has: page.locator('.api-table__name', { hasText: nameMatcher }) })
    .first();
}

export async function openActionsMenu(
  page: Page,
  name: string,
  projectName: string,
) {
  const item = getApiKeyItem(page, name, projectName);

  await item.getByRole('button', { name: `Open actions for ${name}` }).click();

  return page.getByRole('menu', { name: `Actions for ${name}` });
}
