import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TimeSeriesResponse } from "@/core/domain/TwelveData"

interface Props {
  data: TimeSeriesResponse
  symbol: string
}

export function DataTable({ data, symbol }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cotações - {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-muted">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Open</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Close</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">High</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Low</th>
              </tr>
            </thead>
            <tbody>
              {data?.values?.slice(0, 10).map((row, i) => (
                <tr key={i} className="hover:bg-muted">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.datetime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.open}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.close}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.high}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
