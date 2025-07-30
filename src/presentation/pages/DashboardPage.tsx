
import { Cards } from "@/presentation/components/dashboard/Cards"
import { Overview } from "@/presentation/components/dashboard/Overview"
import { RecentSales } from "@/presentation/components/dashboard/RecentSales"
import { DataTable } from "@/presentation/components/dashboard/DataTable"
import { useFinanceStatus } from "@/utils/hooks/useFinanceStatus"

export default function DashboardPage() {
  const { data, isLoading, error } = useFinanceStatus()

  if (isLoading) return <div className="p-8">Carregando dados...</div>
  if (error) return <div className="p-8 text-red-500">Erro ao carregar dados.</div>
  if (!data) return null

  return (
    <main className="flex-1 p-8 pt-6 space-y-6">
      <Cards finance={data} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview bitcoin={data.bitcoin} stocks={data.stocks} />
        <RecentSales currencies={data.currencies} />
      </div>
      <div className="mt-6">
        <DataTable stocks={data.stocks} />
      </div>
    </main>
  )
}
