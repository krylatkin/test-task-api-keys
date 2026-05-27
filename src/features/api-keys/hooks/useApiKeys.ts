import { useCallback, useEffect, useMemo, useState } from 'react'
import { mockApiKeysRepository } from '../api/apiKeys.mock'
import type { ApiKeyItem } from '../model/apiKeys.types'

type UseApiKeysResult = {
  apiKeys: ApiKeyItem[]
  activeCount: number
  isLoading: boolean
  isMutating: boolean
  error: string | null
  refresh: () => Promise<void>
  createKey: () => Promise<ApiKeyItem | null>
  renameKey: (id: string, name: string) => Promise<ApiKeyItem | null>
  toggleKeyStatus: (item: ApiKeyItem) => Promise<ApiKeyItem | null>
  deleteKey: (id: string) => Promise<boolean>
}

export function useApiKeys(): UseApiKeysResult {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function loadInitialKeys() {
      try {
        const items = await mockApiKeysRepository.list()

        if (isCancelled) {
          return
        }

        setApiKeys(items)
      } catch (loadError) {
        if (isCancelled) {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load API keys.',
        )
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialKeys()

    return () => {
      isCancelled = true
    }
  }, [])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const items = await mockApiKeysRepository.list()
      setApiKeys(items)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load API keys.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createKey = useCallback(async () => {
    setIsMutating(true)
    setError(null)

    try {
      const created = await mockApiKeysRepository.create({ name: '' })
      setApiKeys((current) => [created, ...current])
      return created
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'Unable to create API key.',
      )
      return null
    } finally {
      setIsMutating(false)
    }
  }, [])

  const renameKey = useCallback(async (id: string, name: string) => {
    setIsMutating(true)
    setError(null)

    try {
      const updated = await mockApiKeysRepository.update(id, { name })
      setApiKeys((current) =>
        current.map((entry) => (entry.id === updated.id ? updated : entry)),
      )
      return updated
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'Unable to update API key.',
      )
      return null
    } finally {
      setIsMutating(false)
    }
  }, [])

  const toggleKeyStatus = useCallback(async (item: ApiKeyItem) => {
    setIsMutating(true)
    setError(null)

    try {
      const updated =
        item.status === 'revoked'
          ? await mockApiKeysRepository.enable(item.id)
          : await mockApiKeysRepository.revoke(item.id)
      setApiKeys((current) =>
        current.map((entry) => (entry.id === updated.id ? updated : entry)),
      )
      return updated
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : item.status === 'revoked'
            ? 'Unable to enable API key.'
            : 'Unable to disable API key.',
      )
      return null
    } finally {
      setIsMutating(false)
    }
  }, [])

  const deleteKey = useCallback(async (id: string) => {
    setIsMutating(true)
    setError(null)

    try {
      await mockApiKeysRepository.remove(id)
      setApiKeys((current) => current.filter((entry) => entry.id !== id))
      return true
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'Unable to delete API key.',
      )
      return false
    } finally {
      setIsMutating(false)
    }
  }, [])

  const activeCount = useMemo(
    () => apiKeys.filter((entry) => entry.status === 'active').length,
    [apiKeys],
  )

  return {
    apiKeys,
    activeCount,
    isLoading,
    isMutating,
    error,
    refresh,
    createKey,
    renameKey,
    toggleKeyStatus,
    deleteKey,
  }
}
