import { HttpClient } from "./HttpClient"
import { TimeSeriesResponseSchema, type TimeSeriesResponse } from "@/core/domain/TwelveData"
import type { TwelveDataRepository } from "@/core/repositories/TwelveDataRepository"

const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY

/**
 * Implementação do repositório TwelveData usando HttpClient genérico.
 * Fornece métodos para buscar séries temporais de ativos financeiros pela API TwelveData.
 * @extends HttpClient
 * @implements TwelveDataRepository
 */
export class TwelveDataApi extends HttpClient implements TwelveDataRepository {
  /**
   * Inicializa a API definindo a base URL do TwelveData.
   */
  constructor() {
    super("https://api.twelvedata.com/")
  }

  /**
   * Busca os dados históricos de um ativo financeiro (ação, moeda, cripto etc).
   * 
   * @param params - Parâmetros da consulta.
   *   - symbol: Código do ativo (ex: "AAPL", "BTC/USD", "USD/BRL").
   *   - interval: Intervalo das cotações (ex: "1day", "1h").
   * @returns Promise com os dados tipados e validados via Zod.
   * @throws Error em caso de erro de requisição ou dados inválidos.
   */
  async getTimeSeries(params: { symbol: string, interval?: string }): Promise<TimeSeriesResponse> {
    const data = await this.get<unknown>("time_series", {
      ...params,
      apikey: API_KEY,
    })
    // Validação do schema Zod para garantir o formato correto
    return TimeSeriesResponseSchema.parse(data)
  }
}
