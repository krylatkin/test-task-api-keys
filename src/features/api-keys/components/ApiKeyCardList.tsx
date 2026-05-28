import './ApiKeysFeature.css'
import type { ApiKeyItem } from '../model/apiKeys.types'
import { formatMobileSummary } from '../../../shared/lib/formatters'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import { ApiKeyStatusBadge } from './ApiKeyStatusBadge'

type ApiKeyCardListProps = {
  apiKeys: ApiKeyItem[]
  selectedKeyId: string | null
  onSelect: (id: string) => void
  onEdit: (item: ApiKeyItem) => void
  onToggleStatus: (item: ApiKeyItem) => void
  onDelete: (item: ApiKeyItem) => void
}

export function ApiKeyCardList({
  apiKeys,
  selectedKeyId,
  onSelect,
  onEdit,
  onToggleStatus,
  onDelete,
}: ApiKeyCardListProps) {
  if (apiKeys.length === 0) {
    return null
  }

  return (
    <div className="mobile-cards">
      {apiKeys.map((item) => {
        const isSelected = selectedKeyId === item.id

        return (
          <article key={item.id} className="card" data-selected={isSelected}>
            <div className="card__row">
              <button
                type="button"
                className="card__trigger"
                onClick={() => onSelect(item.id)}
              >
                <div className="card__header">
                  <div className="card__title-row">
                    <strong className="card__title">
                      <span className="card__title-name">{item.name}</span>
                      <span className="card__title-mask">{item.maskedKey}</span>
                    </strong>
                  </div>

                  <span className="card__subtitle">
                    {formatMobileSummary(item.expiresAt, item.lastUsedAt)}
                  </span>
                </div>
              </button>
              <div
                className={
                  item.status === 'expired'
                    ? 'card__actions card__actions--with-badge'
                    : 'card__actions'
                }
              >
                {item.status === 'expired' && (
                  <ApiKeyStatusBadge status={item.status} />
                )}

                <ApiKeyActionsMenu
                  itemName={item.name}
                  itemStatus={item.status}
                  onEdit={() => onEdit(item)}
                  onToggleStatus={() => onToggleStatus(item)}
                  onDelete={() => onDelete(item)}
                />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
