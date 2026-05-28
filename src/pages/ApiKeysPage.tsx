import './ApiKeysPage.css'
import AddRounded from '@mui/icons-material/AddRounded'
import {
  ApiKeyCardList,
  ApiKeyEditDialog,
  ApiKeysEmptyState,
  ApiKeysErrorState,
  ApiKeysLoadingState,
  ApiKeysTable,
  useApiKeys,
  type ApiKeyItem,
} from '@/features/api-keys'
import { useMemo, useState } from 'react'
import { AppShell } from '@/shared/layout'

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

  function handleCloseEdit() {
    setEditingItem(null)
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
            onClick={handleCreateKey}
            disabled={isMutating}
          >
            <AddRounded sx={{ fontSize: 18 }} />
            Create API key
          </button>
        </header>

        <section className="page-surface">
          {error ? (
            <ApiKeysErrorState
              message={error}
              onRetry={refresh}
            />
          ) : isLoading ? (
            <ApiKeysLoadingState />
          ) : apiKeys.length === 0 && !isLoading ? (
            <ApiKeysEmptyState
              disabled={isMutating}
              onCreate={handleCreateKey}
            />
          ) : (
            <>
              <ApiKeysTable
                apiKeys={apiKeys}
                selectedKeyId={selectedKeyId}
                onSelect={setSelectedKeyIdOverride}
                onEdit={handleEditKey}
                onToggleStatus={handleToggleKeyStatus}
                onDelete={handleDeleteKey}
              />

              <ApiKeyCardList
                apiKeys={apiKeys}
                selectedKeyId={selectedKeyId}
                onSelect={setSelectedKeyIdOverride}
                onEdit={handleEditKey}
                onToggleStatus={handleToggleKeyStatus}
                onDelete={handleDeleteKey}
              />
            </>
          )}
        </section>

        <button
          type="button"
          className="page-header__primary-action mobile-create"
          onClick={handleCreateKey}
          disabled={isMutating}
        >
          <AddRounded />
          <span className="visually-hidden">Create API key</span>
        </button>
      </div>

      {editingItem ? (
        <ApiKeyEditDialog
          draftName={draftName}
          isSaving={isMutating}
          onChangeDraftName={setDraftName}
          onClose={handleCloseEdit}
          onSave={handleSubmitEdit}
        />
      ) : null}
    </AppShell>
  )
}
