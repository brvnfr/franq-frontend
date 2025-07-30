export class HttpClient {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

async get<T>(url: string, params?: Record<string, string | number | undefined>) {
  const cleanParams: Record<string, string> = {}
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) cleanParams[k] = String(v)
    })
  }
  const search = Object.keys(cleanParams).length
    ? "?" + new URLSearchParams(cleanParams).toString()
    : ""
  const response = await fetch(this.baseUrl + url + search)
  if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
  return response.json() as Promise<T>
}

  async post<T>(url: string, body?: unknown) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }

  async put<T>(url: string, body?: unknown) {
    const response = await fetch(this.baseUrl + url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }

  async delete<T>(url: string) {
    const response = await fetch(this.baseUrl + url, { method: "DELETE" })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }
}
