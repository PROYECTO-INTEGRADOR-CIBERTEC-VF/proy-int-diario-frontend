import { env } from '../../../environments/env'
import { withJwt } from '../interceptors/jwt.interceptor'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestConfig = {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
}

const buildHeaders = (headers: Record<string, string> = {}) => ({
  'Content-Type': 'application/json',
  ...withJwt(headers),
})

const buildUrl = (url: string) => {
  if (/^http?:\/\//i.test(url)) {
    return url
  }

  return `${env.apiUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`
}

export const axiosClient = {
  async request<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const response = await fetch(buildUrl(url), {
      method: config.method ?? 'GET',
      headers: buildHeaders(config.headers),
      body: config.body ? JSON.stringify(config.body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      return (await response.json()) as T
    }

    return (await response.text()) as T
  },

  get<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'GET', headers })
  },

  post<T>(url: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'POST', body, headers })
  },
}
