import type { ApiKeyStatus } from '../model/apiKeys.types'
import './ApiKeyStatusBadge.css'
import { Badge } from '../../../shared/ui/Badge'

const STATUS_LABELS: Record<ApiKeyStatus, string> = {
  active: 'Active',
  expiring: 'Expiring',
  expired: 'Expired',
  revoked: 'Revoked',
}

const STATUS_VARIANTS: Record<ApiKeyStatus, 'neutral' | 'accent'> = {
  active: 'accent',
  expiring: 'neutral',
  expired: 'neutral',
  revoked: 'neutral',
}

type ApiKeyStatusBadgeProps = {
  status: ApiKeyStatus
}

export function ApiKeyStatusBadge({ status }: ApiKeyStatusBadgeProps) {
  return (
    <Badge
      variant={STATUS_VARIANTS[status]}
      className={`api-key-status-badge api-key-status-badge--${status}`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  )
}
