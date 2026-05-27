import './ApiKeysPage.css'
import '../shared/styles/Feedback.css'
import AddRounded from '@mui/icons-material/AddRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useMemo, useState } from 'react'
import { ApiKeyCardList } from '../features/api-keys/components/ApiKeyCardList'
import { ApiKeysTable } from '../features/api-keys/components/ApiKeysTable'
import { useApiKeys } from '../features/api-keys/hooks/useApiKeys'
import type { ApiKeyItem } from '../features/api-keys/model/apiKeys.types'
import { AppShell } from '../shared/layout/AppShell'

export function ApiKeysPage() {
  const {
    apiKeys,
    isLoading,
    isMutating,
    error,
    refresh,
    createKey,
    renameKey,
    toggleKeyStatus,
    deleteKey,
  } = useApiKeys()
  const [selectedKeyIdOverride, setSelectedKeyIdOverride] = useState<string | null>(
    null,
  )
  const [editingItem, setEditingItem] = useState<ApiKeyItem | null>(null)
  const [draftName, setDraftName] = useState('')

  const selectedKeyId = useMemo(() => {
    if (
      selectedKeyIdOverride &&
      apiKeys.some((entry) => entry.id === selectedKeyIdOverride)
    ) {
      return selectedKeyIdOverride
    }

    return apiKeys[0]?.id ?? null
  }, [apiKeys, selectedKeyIdOverride])

  async function handleCreateKey() {
    const created = await createKey()

    if (!created) {
      return
    }

    setSelectedKeyIdOverride(created.id)
  }

  async function handleToggleKeyStatus(item: ApiKeyItem) {
    await toggleKeyStatus(item)
  }

  async function handleDeleteKey(item: ApiKeyItem) {
    const didDelete = await deleteKey(item.id)

    if (didDelete && selectedKeyIdOverride === item.id) {
      setSelectedKeyIdOverride(null)
    }
  }

  function handleEditKey(item: ApiKeyItem) {
    setEditingItem(item)
    setDraftName(item.name)
  }

  async function handleSubmitEdit() {
    if (!editingItem || !draftName.trim()) {
      return
    }

    const updated = await renameKey(editingItem.id, draftName.trim())

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
            <h1 className="page-header__title">API keys</h1>
            <p className="page-header__description">
              Manage your API keys to access all models
            </p>
          </div>

          <button
            type="button"
            className="page-header__primary-action"
            onClick={() => void handleCreateKey()}
            disabled={isMutating}
          >
            <AddRounded sx={{ fontSize: 18 }} />
            Create API key
          </button>
        </header>

        <section className="page-surface">
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
                    Create your first key to access models.
                  </p>
                </div>
                <button
                  type="button"
                  className="empty-state__action"
                  onClick={() => void handleCreateKey()}
                  disabled={isMutating}
                >
                  <AddRounded sx={{ fontSize: 18 }} />
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
                onToggleStatus={(item) => void handleToggleKeyStatus(item)}
                onDelete={(item) => void handleDeleteKey(item)}
              />

              <ApiKeyCardList
                apiKeys={apiKeys}
                isLoading={isLoading}
                selectedKeyId={selectedKeyId}
                onSelect={setSelectedKeyIdOverride}
                onEdit={handleEditKey}
                onToggleStatus={(item) => void handleToggleKeyStatus(item)}
                onDelete={(item) => void handleDeleteKey(item)}
              />
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
                  Edit
                </h3>
                <p className="dialog__hint">Update the name of this API key.</p>
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
                Name
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
