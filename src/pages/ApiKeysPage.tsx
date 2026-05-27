import AddRounded from '@mui/icons-material/AddRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import KeyRounded from '@mui/icons-material/KeyRounded'
import { useEffect, useMemo, useState } from 'react'
import { ApiKeyCardList } from '../features/api-keys/components/ApiKeyCardList'
import { ApiKeysTable } from '../features/api-keys/components/ApiKeysTable'
import { useApiKeys } from '../features/api-keys/hooks/useApiKeys'
import type { ApiKeyItem } from '../features/api-keys/model/apiKeys.types'
import { AppShell } from '../shared/layout/AppShell'

const THINKING_MODES = [
  { label: 'Thinking', color: '#9a93ff' },
  { label: 'Reasoning', color: '#56d6ff' },
  { label: 'Vision', color: '#8af28e' },
] as const

export function ApiKeysPage() {
  const {
    apiKeys,
    activeCount,
    isLoading,
    isMutating,
    error,
    refresh,
    createKey,
    renameKey,
    disableKey,
    deleteKey,
  } = useApiKeys()
  const [selectedKeyIdOverride, setSelectedKeyIdOverride] = useState<string | null>(
    null,
  )
  const [expandedKeyId, setExpandedKeyId] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ApiKeyItem | null>(null)
  const [draftName, setDraftName] = useState('')
  const [thinkingModeIndex, setThinkingModeIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setThinkingModeIndex((current) => (current + 1) % THINKING_MODES.length)
    }, 1800)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const selectedKeyId = useMemo(() => {
    if (
      selectedKeyIdOverride &&
      apiKeys.some((entry) => entry.id === selectedKeyIdOverride)
    ) {
      return selectedKeyIdOverride
    }

    return apiKeys[0]?.id ?? null
  }, [apiKeys, selectedKeyIdOverride])

  const expandedCardId = useMemo(() => {
    if (!expandedKeyId) {
      return null
    }

    return apiKeys.some((entry) => entry.id === expandedKeyId) ? expandedKeyId : null
  }, [apiKeys, expandedKeyId])

  const selectedKey = useMemo(
    () => apiKeys.find((entry) => entry.id === selectedKeyId) ?? null,
    [apiKeys, selectedKeyId],
  )

  const currentThinkingMode = THINKING_MODES[thinkingModeIndex]

  async function handleCreateKey() {
    const created = await createKey()

    if (!created) {
      return
    }

    setSelectedKeyIdOverride(created.id)
    setExpandedKeyId(created.id)
  }

  async function handleDisableKey(item: ApiKeyItem) {
    await disableKey(item.id)
  }

  async function handleDeleteKey(item: ApiKeyItem) {
    const didDelete = await deleteKey(item.id)

    if (!didDelete) {
      return
    }

    if (selectedKeyId === item.id) {
      setSelectedKeyIdOverride(null)
    }
  }

  function handleEditKey(item: ApiKeyItem) {
    setEditingItem(item)
    setDraftName(item.name)
  }

  async function handleSubmitEdit() {
    if (!editingItem) {
      return
    }

    const trimmedName = draftName.trim()

    if (!trimmedName) {
      return
    }

    const updated = await renameKey(editingItem.id, trimmedName)

    if (updated) {
      setEditingItem(null)
      setDraftName('')
    }
  }

  return (
    <AppShell>
      <div className="page">
        <header className="page-header">
          <div>
            <p className="page-header__eyebrow">Access Management</p>
            <h1 className="page-header__title">API keys</h1>
            <p className="page-header__description">
              Manage your API keys and keep the UI ready for smooth backend
              integration. The desktop table supports row-level interaction, while
              the mobile experience turns each card into a tap target with
              accessible actions.
            </p>
          </div>

          <button
            type="button"
            className="page-header__primary-action"
            onClick={() => void handleCreateKey()}
            disabled={isMutating}
          >
            <AddRounded />
            Create API key
          </button>
        </header>

        <section className="page-surface shell-grid">
          <div className="page-surface__header">
            <div>
              <h2 className="page-surface__title">Manage key access</h2>
              <p className="page-surface__description">
                Mock data is loaded asynchronously through a repository interface
                so the UI can later switch to a real backend with minimal churn.
              </p>
            </div>

            <div className="page-surface__meta">
              <KeyRounded fontSize="small" />
              {apiKeys.length} total keys
            </div>
          </div>

          {error ? (
            <div className="error-state" role="alert">
              <div>
                <h3 className="error-state__title">Unable to load API keys</h3>
                <p className="error-state__copy">{error}</p>
              </div>
              <button
                type="button"
                className="empty-state__action"
                onClick={() => void refresh()}
              >
                Retry
              </button>
            </div>
          ) : apiKeys.length === 0 && !isLoading ? (
            <div className="empty-state">
              <div className="empty-state__stack">
                <div>
                  <h3 className="empty-state__title">No API keys yet</h3>
                  <p className="empty-state__copy">
                    Start with a generated mock key. The repository layer already
                    mirrors how a real create endpoint would plug in.
                  </p>
                </div>
                <button
                  type="button"
                  className="empty-state__action"
                  onClick={() => void handleCreateKey()}
                  disabled={isMutating}
                >
                  <AddRounded />
                  Create API key
                </button>
              </div>
            </div>
          ) : (
            <>
              <ApiKeysTable
                apiKeys={apiKeys}
                isLoading={isLoading}
                selectedKeyId={selectedKeyId}
                onSelect={setSelectedKeyIdOverride}
                onEdit={handleEditKey}
                onDisable={(item) => void handleDisableKey(item)}
                onDelete={(item) => void handleDeleteKey(item)}
              />

              <ApiKeyCardList
                apiKeys={apiKeys}
                isLoading={isLoading}
                expandedKeyId={expandedCardId}
                onToggle={(id) =>
                  setExpandedKeyId((current) => (current === id ? null : id))
                }
                onEdit={handleEditKey}
                onDisable={(item) => void handleDisableKey(item)}
                onDelete={(item) => void handleDeleteKey(item)}
              />

              <footer className="panel-footer">
                <div className="panel-footer__selection" aria-live="polite">
                  <span className="panel-footer__note">Selected key</span>
                  <strong>{selectedKey?.name ?? 'None'}</strong>
                </div>

                <div className="metrics">
                  <div className="metric">
                    <span className="metric__label">Active keys</span>
                    <span className="metric__value">{activeCount}</span>
                  </div>
                  <div className="metric">
                    <span className="metric__label">Revoked or expired</span>
                    <span className="metric__value">
                      {apiKeys.length - activeCount}
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric__label">Mutation state</span>
                    <span className="metric__value">
                      {isMutating ? 'Syncing...' : 'Idle'}
                    </span>
                  </div>
                </div>
              </footer>
            </>
          )}
        </section>

        <button
          type="button"
          className="page-header__primary-action mobile-create"
          onClick={() => void handleCreateKey()}
          disabled={isMutating}
        >
          <AddRounded />
          <span className="visually-hidden">Create API key</span>
        </button>

        <section className="thinking-banner" aria-label="Bonus implementation preview">
          <div className="thinking-banner__copy">
            <h2 className="thinking-banner__title">Bonus: Thinking animation</h2>
            <p className="thinking-banner__description">
              The indicator cycles through request modes using a reusable token for
              color, which makes it straightforward to connect to future streaming
              states.
            </p>
          </div>

          <div
            className="thinking-indicator"
            style={{ ['--thinking-color' as string]: currentThinkingMode.color }}
          >
            <span className="thinking-indicator__label">
              {currentThinkingMode.label}
            </span>
            <span className="thinking-indicator__dots" aria-hidden="true">
              <span className="thinking-indicator__dot"></span>
              <span className="thinking-indicator__dot"></span>
              <span className="thinking-indicator__dot"></span>
            </span>
          </div>
        </section>
      </div>

      {editingItem ? (
        <div className="dialog-backdrop" role="presentation">
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rename-key-title"
          >
            <div className="dialog__header">
              <div>
                <h3 id="rename-key-title" className="dialog__title">
                  Edit API key
                </h3>
                <p className="dialog__hint">
                  Rename the key now, keep the repository contract stable for the
                  real backend later.
                </p>
              </div>

              <button
                type="button"
                className="dialog__close"
                aria-label="Close dialog"
                onClick={() => setEditingItem(null)}
              >
                <CloseRounded fontSize="small" />
              </button>
            </div>

            <div className="dialog__body">
              <label className="dialog__label">
                Key name
                <input
                  autoFocus
                  className="dialog__input"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                />
              </label>
            </div>

            <div className="dialog__footer">
              <button
                type="button"
                className="dialog__action dialog__action--secondary"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="dialog__action dialog__action--primary"
                onClick={() => void handleSubmitEdit()}
                disabled={isMutating || !draftName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  )
}
