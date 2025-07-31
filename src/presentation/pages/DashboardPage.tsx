import { useState } from "react"
import { Header } from "@/presentation/components/dashboard/Header";
import { Cards } from "@/presentation/components/dashboard/Cards"
import { Overview } from "@/presentation/components/dashboard/Overview"
import { DataTable } from "@/presentation/components/dashboard/DataTable"
import { useStockTimeSeries } from "@/utils/hooks/useStockTimeSeries"

const symbols = [
  { value: "AAPL", label: "Apple" },
  { value: "BTC/USD", label: "Bitcoin" },
  { value: "USD/BRL", label: "Dólar" }
]

export default function DashboardPage() {
  const [symbol, setSymbol] = useState(symbols[0].value)
  const { data, isLoading, error } = useStockTimeSeries(symbol)

  return (
    <>
      <Header />
      <main className="flex-1 p-8 pt-10 space-y-6">
        <div className="mb-12">          
        <span className="text-xl font-bold tracking-tight text-primary mb-6">
          Dashboard
        </span>
        </div>
        <div className="mb-4">
          <select
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {symbols.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        {isLoading && <div>Carregando dados...</div>}
        {error && <div className="text-red-500">Erro ao carregar dados.</div>}
        {data && (
          <>
            <Cards symbol={symbol} data={data} />
            <Overview symbol={symbol} data={data} />
            <DataTable symbol={symbol} data={data} />
          </>
        )}
      </main>
    </>
  )
}
