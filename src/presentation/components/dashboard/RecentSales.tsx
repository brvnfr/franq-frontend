import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Currency } from "@/core/domain/Finance";

export function RecentSales({ currencies }: { currencies: { USD: Currency; EUR: Currency; source: string } }) {
  const moedas = [
    { nome: "Dólar", ...currencies.USD },
    { nome: "Euro", ...currencies.EUR },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Principais Moedas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {moedas.map((m, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="font-medium">{m.nome}</span>
            <span>Compra: R$ {m.buy.toFixed(2)}</span>
            <span>Venda: R$ {m.sell.toFixed(2)}</span>
            <span>Variação: {m.variation > 0 ? "+" : ""}{m.variation.toFixed(2)}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
