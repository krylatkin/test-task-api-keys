import type { ApiKeyStatus } from '../model/apiKeys.types'

const STATUS_LABELS: Record<ApiKeyStatus, string> = {
  active: 'Active',
  expiring: 'Expiring',
  expired: 'Expired',
  revoked: 'Revoked',
}

type ApiKeyStatusBadgeProps = {
  status: ApiKeyStatus
}

export function ApiKeyStatusBadge({ status }: ApiKeyStatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
