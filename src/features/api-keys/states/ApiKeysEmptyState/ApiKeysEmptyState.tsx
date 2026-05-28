import './ApiKeysEmptyState.css'
import AddRounded from '@mui/icons-material/AddRounded'

type ApiKeysEmptyStateProps = {
  disabled?: boolean
  onCreate: () => void
}

export function ApiKeysEmptyState({
  disabled = false,
  onCreate,
}: ApiKeysEmptyStateProps) {
  return (
    <div className="api-keys-empty-state">
      <div className="api-keys-empty-state__stack">
        <div>
          <h3 className="api-keys-empty-state__title">No API keys yet</h3>
          <p className="api-keys-empty-state__copy">
            Create your first key to access models.
          </p>
        </div>
        <button
          type="button"
          className="api-keys-empty-state__action"
          onClick={onCreate}
          disabled={disabled}
        >
          <AddRounded sx={{ fontSize: 18 }} />
          Create API key
        </button>
      </div>
    </div>
  )
}
