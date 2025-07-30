import type { TimeSeriesResponse } from "../domain/TwelveData"

export interface TwelveDataRepository {
  getTimeSeries(params: { symbol: string, interval?: string }): Promise<TimeSeriesResponse>
}
