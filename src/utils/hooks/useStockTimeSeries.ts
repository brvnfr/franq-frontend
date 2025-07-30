import { useQuery } from "@tanstack/react-query"
import { TwelveDataApi } from "@/infrastructure/api/TwelveDataApi"
import { GetStockTimeSeriesUseCase } from "@/core/use-cases/GetStockTimeSeriesUseCase"
import type { TimeSeriesResponse } from "@/core/domain/TwelveData"

const repo = new TwelveDataApi()
const getStockTimeSeriesUseCase = new GetStockTimeSeriesUseCase(repo)

/**
 * Busca dados de um único ativo do Twelve Data.
 * @param symbol Ex: "AAPL", "BTC/USD", "USD/BRL"
 * @param interval Ex: "1day", "1h", etc (padrão: "1day")
 */
export function useStockTimeSeries(symbol: string, interval = "1day") {
  return useQuery<TimeSeriesResponse>({
    queryKey: ["stock-time-series", symbol, interval],
    queryFn: () =>
      getStockTimeSeriesUseCase.execute({
        symbol,
        interval,
      }),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 5,
  })
}
