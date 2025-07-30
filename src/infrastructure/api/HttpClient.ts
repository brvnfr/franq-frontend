export class HttpClient {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(url: string, params?: Record<string, string | number>) {
    const search = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
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
