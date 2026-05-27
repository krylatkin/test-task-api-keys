import type { ApiKeysRepository } from './apiKeys.repository'
import type {
  ApiKeyItem,
  CreateApiKeyInput,
  UpdateApiKeyInput,
} from '../model/apiKeys.types'

let store: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'ai_inference_key',
    maskedKey: 'a1b2...x9yz',
    status: 'active',
    expiresAt: '2026-06-25T00:00:00.000Z',
    createdAt: '2026-04-03T09:42:00.000Z',
    lastUsedAt: null,
  },
  {
    id: 'key-2',
    name: 'model_training_key',
    maskedKey: 'c3d4...w8vu',
    status: 'active',
    expiresAt: '2026-06-23T00:00:00.000Z',
    createdAt: '2026-03-31T13:18:00.000Z',
    lastUsedAt: '2026-05-27T05:00:00.000Z',
  },
  {
    id: 'key-3',
    name: 'vision_model_key',
    maskedKey: 'e5f6...t7rs',
    status: 'expired',
    expiresAt: null,
    createdAt: '2026-03-25T11:26:00.000Z',
    lastUsedAt: '2026-05-25T15:10:00.000Z',
  },
  {
    id: 'key-4',
    name: 'vision_model_key_v1',
    maskedKey: 'g7h8...q6po',
    status: 'expired',
    expiresAt: null,
    createdAt: '2026-03-05T16:04:00.000Z',
    lastUsedAt: '2026-05-14T10:02:00.000Z',
  },
]

function cloneItem(item: ApiKeyItem): ApiKeyItem {
  return { ...item }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function findOrThrow(id: string): ApiKeyItem {
  const item = store.find((entry) => entry.id === id)

  if (!item) {
    throw new Error('API key was not found.')
  }

  return item
}

function buildNewKeyName(sourceLength: number): string {
  return `new_api_key_${sourceLength + 1}`
}

function buildMaskedKey(): string {
  return `${Math.random().toString(16).slice(2, 6)}...${Math.random()
    .toString(16)
    .slice(2, 6)}`
}

export const mockApiKeysRepository: ApiKeysRepository = {
  async list() {
    await delay(220)

    return store.map(cloneItem)
  },
  async create(input: CreateApiKeyInput) {
    await delay(160)

    const item: ApiKeyItem = {
      id: crypto.randomUUID(),
      name: input.name || buildNewKeyName(store.length),
      maskedKey: buildMaskedKey(),
      status: 'active',
      expiresAt: '2026-07-04T00:00:00.000Z',
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    }

    store = [item, ...store]
    return cloneItem(item)
  },
  async update(id: string, input: UpdateApiKeyInput) {
    await delay(150)

    const current = findOrThrow(id)
    const updated = { ...current, ...input }

    store = store.map((entry) => (entry.id === id ? updated : entry))
    return cloneItem(updated)
  },
  async revoke(id: string) {
    await delay(140)

    const current = findOrThrow(id)
    const updated: ApiKeyItem = {
      ...current,
      status: 'revoked',
      expiresAt: null,
    }

    store = store.map((entry) => (entry.id === id ? updated : entry))
    return cloneItem(updated)
  },
  async remove(id: string) {
    await delay(120)

    findOrThrow(id)
    store = store.filter((entry) => entry.id !== id)
  },
}
