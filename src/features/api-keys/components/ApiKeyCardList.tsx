import './ApiKeysFeature.css'
import type { ApiKeyItem } from '../model/apiKeys.types'
import { formatMobileSummary } from '../../../shared/lib/formatters'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import { ApiKeyStatusBadge } from './ApiKeyStatusBadge'

type ApiKeyCardListProps = {
  apiKeys: ApiKeyItem[]
  isLoading: boolean
  selectedKeyId: string | null
  onSelect: (id: string) => void
  onEdit: (item: ApiKeyItem) => void
  onToggleStatus: (item: ApiKeyItem) => void
  onDelete: (item: ApiKeyItem) => void
}

export function ApiKeyCardList({
  apiKeys,
  isLoading,
  selectedKeyId,
  onSelect,
  onEdit,
  onToggleStatus,
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
        const isSelected = selectedKeyId === item.id

        return (
          <article key={item.id} className="card" data-selected={isSelected}>
            <button
              type="button"
              className="card__trigger"
              onClick={() => onSelect(item.id)}
            >
              <div className="card__header">
                <div className="card__title-row">
                  <strong className="card__title">
                    {item.name} {item.maskedKey}
                  </strong>
                  {item.status === 'expired' ? (
                    <ApiKeyStatusBadge status={item.status} />
                  ) : null}
                </div>

                <span className="card__subtitle">
                  {formatMobileSummary(item.expiresAt, item.lastUsedAt)}
                </span>
              </div>
              <ApiKeyActionsMenu
                itemName={item.name}
                itemStatus={item.status}
                onEdit={() => onEdit(item)}
                onToggleStatus={() => onToggleStatus(item)}
                onDelete={() => onDelete(item)}
              />
            </button>
          </article>
        )
      })}
    </div>
  )
}
