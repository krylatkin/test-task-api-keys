import type {
  ApiKeyItem,
  CreateApiKeyInput,
  UpdateApiKeyInput,
} from '../model/apiKeys.types'

export interface ApiKeysRepository {
  list(): Promise<ApiKeyItem[]>
  create(input: CreateApiKeyInput): Promise<ApiKeyItem>
  update(id: string, input: UpdateApiKeyInput): Promise<ApiKeyItem>
  revoke(id: string): Promise<ApiKeyItem>
  enable(id: string): Promise<ApiKeyItem>
  remove(id: string): Promise<void>
}
