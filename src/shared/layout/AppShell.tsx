import './AppShell.css'
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded'
import ArticleRounded from '@mui/icons-material/ArticleRounded'
import CreditCardRounded from '@mui/icons-material/CreditCardRounded'
import LayersIcon from '@mui/icons-material/Layers'
import KeyRounded from '@mui/icons-material/KeyRounded'
import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import PaidRounded from '@mui/icons-material/PaidRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import SportsEsportsRounded from '@mui/icons-material/SportsEsportsRounded'
import StackedBarChartRounded from '@mui/icons-material/StackedBarChartRounded'
import { useState, type ReactNode } from 'react'
import { Badge } from '../ui/Badge'
import { Pill } from '../ui/Pill'

type AppShellProps = {
  children: ReactNode
}

const primaryNav = [
  { label: 'Models', icon: LayersIcon },
  { label: 'API keys', icon: KeyRounded, current: true },
  { label: 'Usage', icon: StackedBarChartRounded },
  { label: 'Billing', icon: CreditCardRounded },
  { label: 'Playground', icon: SportsEsportsRounded },
]

const nodeNav = [{ label: 'Node rewards', icon: PaidRounded }]

const systemNav = [
  { label: 'Settings', icon: SettingsRounded },
  { label: 'Docs', icon: MenuBookRounded },
]

const mobileNav = [
  { label: 'Models', icon: LayersIcon },
  { label: 'API keys', icon: KeyRounded, current: true },
  { label: 'Usage', icon: StackedBarChartRounded },
  { label: 'Billing', icon: CreditCardRounded },
  { label: 'Account', icon: AccountCircleRounded },
]

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div
      className="app-shell"
      data-sidebar-collapsed={isSidebarCollapsed ? 'true' : 'false'}
    >
      <aside className="app-sidebar" aria-label="Primary navigation">
        <div className="app-sidebar__section app-sidebar__section--top">
          <div className="app-sidebar__brand-row">
            <div className="app-sidebar__brand">
              <span className="app-sidebar__brand-wordmark">FARLABS</span>
            </div>

            <button
              type="button"
              className="app-sidebar__collapse"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-pressed={isSidebarCollapsed}
              onClick={() => setIsSidebarCollapsed((current) => !current)}
            >
              <ArticleRounded fontSize="small" />
            </button>
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
                <span className="app-sidebar__link-text">{label}</span>
              </button>
            ))}
          </div>

          <div className="app-sidebar__nav">
            <span className="app-sidebar__label">Node</span>

            {nodeNav.map(({ label, icon: Icon }) => (
              <button key={label} type="button" className="app-sidebar__link">
                <span className="app-sidebar__link-icon">
                  <Icon fontSize="small" />
                </span>
                <span className="app-sidebar__link-text">{label}</span>
              </button>
            ))}
          </div>

          <div className="app-sidebar__nav">
            <span className="app-sidebar__label">System</span>

            {systemNav.map(({ label, icon: Icon }) => (
              <button key={label} type="button" className="app-sidebar__link">
                <span className="app-sidebar__link-icon">
                  <Icon fontSize="small" />
                </span>
                <span className="app-sidebar__link-text">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="app-shell__viewport">
        <header className="desktop-topbar" aria-label="Account information">
          <div className="desktop-topbar__spacer"></div>
          <div className="desktop-topbar__actions">
            <Pill>$145,20</Pill>
            <Pill className="desktop-topbar__avatar" shape="circle">
              RG
            </Pill>
          </div>
        </header>

        <header className="mobile-header">
          <div className="mobile-header__main">
            <h1 className="mobile-header__page">API keys</h1>
          </div>
        </header>

        <main className="app-shell__content">{children}</main>

        <nav className="mobile-nav" aria-label="Bottom navigation">
          {mobileNav.map(({ label, icon: Icon, current }) => (
            <button
              key={label}
              type="button"
              className="mobile-nav__link"
              aria-current={current ? 'page' : undefined}
            >
              <span className="mobile-nav__icon">
                <Icon fontSize="small" />
              </span>
              <span className="mobile-nav__text">{label}</span>
              {label === 'Billing' ? (
                <Badge size="sm" variant="danger" className="mobile-nav__badge">
                  8
                </Badge>
              ) : null}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
