import './ApiKeysFeature.css'
import type { KeyboardEvent } from 'react'
import type { ApiKeyItem } from '../model/apiKeys.types'
import {
  formatCalendarDate,
  formatExpiry,
  formatRelativeDate,
} from '../../../shared/lib/formatters'
import { ApiKeyActionsMenu } from './ApiKeyActionsMenu'
import { ApiKeyStatusBadge } from './ApiKeyStatusBadge'

type ApiKeysTableProps = {
  apiKeys: ApiKeyItem[]
  selectedKeyId: string | null
  onSelect: (id: string) => void
  onEdit: (item: ApiKeyItem) => void
  onToggleStatus: (item: ApiKeyItem) => void
  onDelete: (item: ApiKeyItem) => void
}

export function ApiKeysTable({
  apiKeys,
  selectedKeyId,
  onSelect,
  onEdit,
  onToggleStatus,
  onDelete,
}: ApiKeysTableProps) {
  if (apiKeys.length === 0) {
    return null
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, id: string) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    onSelect(id)
  }

  return (
    <div className="table-wrap">
      <table className="api-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">API key</th>
            <th scope="col">Status</th>
            <th scope="col">Expires</th>
            <th scope="col">Created</th>
            <th scope="col">Last used</th>
            <th scope="col">
              <span className="visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((item) => (
            <tr
              key={item.id}
              tabIndex={0}
              className="api-table__row"
              aria-selected={selectedKeyId === item.id}
              onClick={() => onSelect(item.id)}
              onKeyDown={(event) => handleRowKeyDown(event, item.id)}
            >
              <td>
                <span className="api-table__name">{item.name}</span>
              </td>
              <td>
                <span className="api-table__key">{item.maskedKey}</span>
              </td>
              <td>
                <ApiKeyStatusBadge status={item.status} />
              </td>
              <td>{formatExpiry(item.expiresAt)}</td>
              <td>{formatCalendarDate(item.createdAt)}</td>
              <td>{formatRelativeDate(item.lastUsedAt)}</td>
              <td>
                <ApiKeyActionsMenu
                  itemName={item.name}
                  itemStatus={item.status}
                  onEdit={() => onEdit(item)}
                  onToggleStatus={() => onToggleStatus(item)}
                  onDelete={() => onDelete(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
