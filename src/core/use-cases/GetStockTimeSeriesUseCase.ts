import type { TwelveDataRepository } from "@/core/repositories/TwelveDataRepository"
import type { TimeSeriesResponse } from "@/core/domain/TwelveData"

export class GetStockTimeSeriesUseCase {
  private repo: TwelveDataRepository

  constructor(repo: TwelveDataRepository) {
    this.repo = repo
  }

  async execute(params: { symbol: string; interval?: string }): Promise<TimeSeriesResponse> {
    return this.repo.getTimeSeries(params)
  }
}
