import './ApiKeysErrorState.css'

type ApiKeysErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ApiKeysErrorState({
  message,
  onRetry,
}: ApiKeysErrorStateProps) {
  return (
    <div className="api-keys-error-state" role="alert">
      <div>
        <h3 className="api-keys-error-state__title">Unable to load API keys</h3>
        <p className="api-keys-error-state__copy">{message}</p>
      </div>
      <button
        type="button"
        className="api-keys-error-state__action"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  )
}
