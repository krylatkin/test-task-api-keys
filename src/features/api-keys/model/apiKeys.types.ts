export type ApiKeyStatus = 'active' | 'expiring' | 'expired' | 'revoked';

export type ApiKeyItem = {
  id: string;
  name: string;
  maskedKey: string;
  status: ApiKeyStatus;
  expiresAt: string | null;
  createdAt: string;
  lastUsedAt: string | null;
};

export type CreateApiKeyInput = {
  name: string;
};

export type UpdateApiKeyInput = {
  name?: string;
  status?: ApiKeyStatus;
};
