import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TimeSeriesResponse } from "@/core/domain/TwelveData"

interface Props {
  data: TimeSeriesResponse
  symbol: string
}

export function Overview({ data, symbol }: Props) {
  const chartData = (data?.values || []).slice(0, 14).reverse().map(v => ({
    name: v.datetime,
    close: Number(v.close),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico - {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="close" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
