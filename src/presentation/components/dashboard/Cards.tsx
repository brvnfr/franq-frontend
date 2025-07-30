import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Activity } from "lucide-react"
import type { FinanceStatus } from "@/core/domain/Finance"

export function Cards({ finance }: { finance: FinanceStatus }) {
  const ibovespa = finance.stocks.IBOVESPA
  const usd = finance.currencies.USD
  const btc = finance.bitcoin[0]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">IBOVESPA</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ibovespa.points.toLocaleString("pt-BR")}</div>
          <p className="text-xs text-muted-foreground">
            {ibovespa.variation > 0 ? "+" : ""}
            {ibovespa.variation.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dólar</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {usd.buy.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {usd.variation > 0 ? "+" : ""}
            {usd.variation.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bitcoin</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{btc.last.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
          <p className="text-xs text-muted-foreground">
            {btc.variation > 0 ? "+" : ""}
            {btc.variation.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
      {/* Você pode criar mais cards com outras infos */}
    </div>
  )
}
