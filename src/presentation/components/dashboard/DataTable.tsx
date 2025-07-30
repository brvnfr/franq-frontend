import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Stock } from "@/core/domain/Finance"

export function DataTable({ stocks }: { stocks: Record<string, Stock> }) {
  const lista = Object.values(stocks)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações (Stocks)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-muted">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pontos</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Localização</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Variação</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((s, i) => (
                <tr key={i} className="hover:bg-muted">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{s.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{s.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{s.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{s.variation > 0 ? "+" : ""}{s.variation.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
