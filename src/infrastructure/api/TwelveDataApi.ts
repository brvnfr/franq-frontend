import { HttpClient } from "./HttpClient"
import { TimeSeriesResponseSchema, type TimeSeriesResponse } from "@/core/domain/TwelveData"
import type { TwelveDataRepository } from "@/core/repositories/TwelveDataRepository"

const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY
console.log("TwelveData API Key:", API_KEY)

export class TwelveDataApi extends HttpClient implements TwelveDataRepository {
  constructor() {
    super("https://api.twelvedata.com/")
  }

  async getTimeSeries(params: { symbol: string, interval?: string }): Promise<TimeSeriesResponse> {
    const data = await this.get<unknown>("time_series", {
      ...params,
      apikey: API_KEY,
    })
    return TimeSeriesResponseSchema.parse(data)
  }
}
