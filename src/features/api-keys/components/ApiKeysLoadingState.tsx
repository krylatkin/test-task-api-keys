import './ApiKeysLoadingState.css'

export function ApiKeysLoadingState() {
  return (
    <div className="loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-state__stack">
        <div className="loading-row"></div>
        <div className="loading-row"></div>
        <div className="loading-row"></div>
        <div className="loading-row"></div>
        <span className="inline-message">Syncing mock API keys...</span>
      </div>
    </div>
  )
}
