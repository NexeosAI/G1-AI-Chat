import { APIConfig, Message } from './types';
import { API_CONFIG } from './constants';

const defaultConfig: APIConfig = {
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  model: import.meta.env.VITE_AI_MODEL || API_CONFIG.DEFAULT_MODEL,
  baseURL: import.meta.env.VITE_API_URL || 'https://openrouter.ai/api/v1',
  timeout: API_CONFIG.TIMEOUT,
  maxRetries: API_CONFIG.MAX_RETRIES,
  headers: {
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://g1.chat',
    'X-Title': 'G1.chat powered by NEXEOS',
  },
};

export async function sendMessage(messages: Message[]): Promise<Message> {
  try {
    const response = await fetch(`${defaultConfig.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        ...defaultConfig.headers,
        'Authorization': `Bearer ${defaultConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: defaultConfig.model,
        messages: messages.map(({ content, role }) => ({ role, content })),
        temperature: Number(import.meta.env.VITE_TEMPERATURE) || API_CONFIG.DEFAULT_TEMPERATURE,
        max_tokens: Number(import.meta.env.VITE_MAX_TOKENS) || API_CONFIG.DEFAULT_MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      content: data.choices[0].message.content,
      role: 'assistant',
      timestamp: Date.now(),
      status: 'sent',
      metadata: {
        model: data.model,
        processingTime: data.usage?.total_ms,
        tokenCount: data.usage?.total_tokens,
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}