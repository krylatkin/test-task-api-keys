import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import type { ApiKeyItem } from '../model/apiKeys.types'
import {
  formatCalendarDate,
  formatExpiry,
  formatRelativeDate,
} from '../../../shared/lib/formatters'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import { ApiKeyStatusBadge } from './ApiKeyStatusBadge'

type ApiKeyCardListProps = {
  apiKeys: ApiKeyItem[]
  isLoading: boolean
  expandedKeyId: string | null
  onToggle: (id: string) => void
  onEdit: (item: ApiKeyItem) => void
  onDisable: (item: ApiKeyItem) => void
  onDelete: (item: ApiKeyItem) => void
}

export function ApiKeyCardList({
  apiKeys,
  isLoading,
  expandedKeyId,
  onToggle,
  onEdit,
  onDisable,
  onDelete,
}: ApiKeyCardListProps) {
  if (isLoading) {
    return (
      <div className="loading-state" aria-live="polite" aria-busy="true">
        <div className="loading-state__stack">
          <div className="loading-row loading-row--compact"></div>
          <div className="loading-row loading-row--compact"></div>
          <div className="loading-row loading-row--compact"></div>
        </div>
      </div>
    )
  }

  if (apiKeys.length === 0) {
    return null
  }

  return (
    <div className="mobile-cards">
      {apiKeys.map((item) => {
        const isExpanded = expandedKeyId === item.id

        return (
          <article key={item.id} className="card" data-expanded={isExpanded}>
            <button
              type="button"
              className="card__trigger"
              aria-expanded={isExpanded}
              onClick={() => onToggle(item.id)}
            >
              <div className="card__header">
                <span className="card__kicker">API key</span>
                <strong className="card__title">{item.name}</strong>
                <span className="card__subtitle">{item.maskedKey}</span>
                <div className="card__meta">
                  <ApiKeyStatusBadge status={item.status} />
                  <span className="card__subtitle">
                    Last used {formatRelativeDate(item.lastUsedAt)}
                  </span>
                </div>
              </div>
              <KeyboardArrowDownRounded className="card__chevron" />
            </button>

            {isExpanded ? (
              <div className="card__body">
                <div className="card__grid">
                  <div className="card__field">
                    <span className="card__field-label">Created</span>
                    <span className="card__field-value">
                      {formatCalendarDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="card__field">
                    <span className="card__field-label">Expires</span>
                    <span className="card__field-value">
                      {formatExpiry(item.expiresAt)}
                    </span>
                  </div>
                </div>

                <ApiKeyActionsMenu
                  itemName={item.name}
                  onEdit={() => onEdit(item)}
                  onDisable={() => onDisable(item)}
                  onDelete={() => onDelete(item)}
                />
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
