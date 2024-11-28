export const APP_NAME = 'G1.chat';
export const APP_DESCRIPTION = 'Powered by NEXEOS';

export const API_CONFIG = {
  DEFAULT_MODEL: 'anthropic/claude-2',
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 2048,
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
} as const;

export const UI_CONFIG = {
  MAX_INPUT_LENGTH: 4000,
  MESSAGE_LOAD_LIMIT: 50,
  TYPING_DEBOUNCE: 500,
} as const;