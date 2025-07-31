import type { TwelveDataRepository } from "@/core/repositories/TwelveDataRepository";
import type { TimeSeriesResponse } from "@/core/domain/TwelveData";

/**
 * Caso de uso para buscar séries temporais de ativos (ações, moedas, criptos) via TwelveData.
 *
 * @example
 *   const useCase = new GetStockTimeSeriesUseCase(repo);
 *   const data = await useCase.execute({ symbol: "AAPL", interval: "1day" });
 */
export class GetStockTimeSeriesUseCase {
  private repo: TwelveDataRepository;

  /**
   * @param repo Instância de repositório compatível com TwelveData (infrastructure/api)
   */
  constructor(repo: TwelveDataRepository) {
    this.repo = repo;
  }

  /**
   * Executa a busca de séries temporais.
   * @param params Parâmetros para consulta:
   *   - symbol: Código do ativo, ex: "AAPL", "BTC/USD", "USD/BRL"
   *   - interval: Intervalo de tempo, ex: "1day", "1h" (opcional, default: "1day")
   * @returns Retorna um objeto validado conforme o schema TimeSeriesResponse (zod)
   */
  async execute(params: { symbol: string; interval?: string }): Promise<TimeSeriesResponse> {
    return this.repo.getTimeSeries(params);
  }
}
