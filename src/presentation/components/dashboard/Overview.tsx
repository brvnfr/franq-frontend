import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Bitcoin, Stock } from "@/core/domain/Finance"

export function Overview({ bitcoin }: { bitcoin: Bitcoin[]; stocks: Record<string, Stock> }) {
  // Simule histórico: gere variações baseadas no valor atual
  const btc = bitcoin[0]
  const data = Array.from({ length: 7 }).map((_, i) => ({
    name: `Dia ${i + 1}`,
    valor: btc.last * (1 + (btc.variation / 100) * (i / 7 - 0.5)),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bitcoin (últimos dias - demo)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
