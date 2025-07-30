import { z } from "zod"

// Esquema de um único ativo (TimeSeries)
export const TimeSeriesResponseSchema = z.object({
  meta: z.object({
    symbol: z.string(),
    interval: z.string(),
    currency_base: z.string().optional(),
    currency_quote: z.string().optional(),
    currency: z.string().optional(),
    exchange: z.string().optional(),
    type: z.string(),
  }),
  values: z.array(
    z.object({
      datetime: z.string(),
      open: z.string(),
      high: z.string(),
      low: z.string(),
      close: z.string(),
      volume: z.string().optional(),
    })
  ),
  status: z.string(),
})

export type TimeSeriesResponse = z.infer<typeof TimeSeriesResponseSchema>

export const MultiTimeSeriesResponseSchema = z.record(z.string(), TimeSeriesResponseSchema)
export type MultiTimeSeriesResponse = z.infer<typeof MultiTimeSeriesResponseSchema>
