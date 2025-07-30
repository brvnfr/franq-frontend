import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Activity } from "lucide-react"
import type { TimeSeriesResponse } from "@/core/domain/TwelveData"

interface Props {
  data: TimeSeriesResponse
  symbol: string
}

export function Cards({ data, symbol }: Props) {
  const price = data?.values[0]
  const prevPrice = data?.values[1]

  // Define título com base no symbol
  let title = symbol
  if (symbol === "AAPL") title = "Apple"
  if (symbol === "BTC/USD") title = "Bitcoin"
  if (symbol === "USD/BRL") title = "Dólar"

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title} ({symbol})</CardTitle>
          {symbol === "AAPL" && <DollarSign className="h-4 w-4 text-muted-foreground" />}
          {symbol === "USD/BRL" && <CreditCard className="h-4 w-4 text-muted-foreground" />}
          {symbol === "BTC/USD" && <Activity className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {price?.close ? Number(price.close).toLocaleString("pt-BR", { style: "currency", currency: symbol === "USD/BRL" ? "BRL" : "USD" }) : "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {price && prevPrice
              ? (((Number(price.close) - Number(prevPrice.close)) / Number(prevPrice.close)) * 100).toFixed(2) + "%"
              : "--"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
