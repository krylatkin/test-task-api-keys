import AppsRounded from '@mui/icons-material/AppsRounded'
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded'
import CreditCardRounded from '@mui/icons-material/CreditCardRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import NotificationsNoneRounded from '@mui/icons-material/NotificationsNoneRounded'
import QueryStatsRounded from '@mui/icons-material/QueryStatsRounded'
import ScienceRounded from '@mui/icons-material/ScienceRounded'
import VpnKeyRounded from '@mui/icons-material/VpnKeyRounded'
import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

const primaryNav = [
  { label: 'Models', icon: AutoAwesomeRounded },
  { label: 'API keys', icon: VpnKeyRounded, current: true },
  { label: 'Usage', icon: QueryStatsRounded },
  { label: 'Billing', icon: CreditCardRounded },
  { label: 'Playground', icon: ScienceRounded },
]

const secondaryNav = [
  { label: 'Models', icon: AutoAwesomeRounded },
  { label: 'API keys', icon: VpnKeyRounded, current: true },
  { label: 'Usage', icon: QueryStatsRounded },
  { label: 'Billing', icon: CreditCardRounded },
  { label: 'Account', icon: AppsRounded },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar" aria-label="Primary navigation">
        <div className="app-sidebar__section">
          <div className="app-sidebar__brand">
            <span className="app-sidebar__brand-mark">F</span>
            <span>Farlabs</span>
          </div>

          <div className="app-sidebar__nav">
            <span className="app-sidebar__label">Platform</span>

            {primaryNav.map(({ label, icon: Icon, current }) => (
              <button
                key={label}
                type="button"
                className="app-sidebar__link"
                aria-current={current ? 'page' : undefined}
              >
                <span className="app-sidebar__link-icon">
                  <Icon fontSize="small" />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="app-sidebar__footer">
          <p className="app-sidebar__footer-title">Mock environment</p>
          <p className="app-sidebar__footer-copy">
            The screen is wired as if a real API could be connected next.
          </p>
        </div>
      </aside>

      <div className="app-shell__viewport">
        <header className="mobile-header">
          <button type="button" className="mobile-header__button" aria-label="Open menu">
            <MenuRounded />
          </button>

          <div className="mobile-header__title">
            <span className="mobile-header__eyebrow">Farlabs</span>
            <span className="mobile-header__page">API keys</span>
          </div>

          <button
            type="button"
            className="mobile-header__button"
            aria-label="Notifications"
          >
            <NotificationsNoneRounded />
          </button>
        </header>

        <main className="app-shell__content">{children}</main>

        <nav className="mobile-nav" aria-label="Bottom navigation">
          {secondaryNav.map(({ label, icon: Icon, current }) => (
            <button
              key={label}
              type="button"
              className="mobile-nav__link"
              aria-current={current ? 'page' : undefined}
            >
              <span className="mobile-nav__icon">
                <Icon fontSize="small" />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
