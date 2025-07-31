/**
 * Classe base para requisições HTTP simples usando fetch API.
 */
export class HttpClient {
  baseUrl: string

  /**
   * @param baseUrl Base da URL para as requisições (ex: https://api.exemplo.com/)
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Realiza uma requisição GET.
   * @template T Tipo esperado da resposta.
   * @param url Rota relativa à baseUrl.
   * @param params Parâmetros da query string.
   * @returns {Promise<T>} Retorna a resposta tipada.
   * @throws Erro se a resposta não for ok.
   */
  async get<T>(url: string, params?: Record<string, string | number | undefined>): Promise<T> {
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

  /**
   * Realiza uma requisição POST.
   * @template T Tipo esperado da resposta.
   * @param url Rota relativa à baseUrl.
   * @param body Corpo do POST.
   * @returns {Promise<T>} Retorna a resposta tipada.
   * @throws Erro se a resposta não for ok.
   */
  async post<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }

  /**
   * Realiza uma requisição PUT.
   * @template T Tipo esperado da resposta.
   * @param url Rota relativa à baseUrl.
   * @param body Corpo do PUT.
   * @returns {Promise<T>} Retorna a resposta tipada.
   * @throws Erro se a resposta não for ok.
   */
  async put<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }

  /**
   * Realiza uma requisição DELETE.
   * @template T Tipo esperado da resposta.
   * @param url Rota relativa à baseUrl.
   * @returns {Promise<T>} Retorna a resposta tipada.
   * @throws Erro se a resposta não for ok.
   */
  async delete<T>(url: string): Promise<T> {
    const response = await fetch(this.baseUrl + url, { method: "DELETE" })
    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText)
    return response.json() as Promise<T>
  }
}
