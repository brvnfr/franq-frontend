import { useQuery } from "@tanstack/react-query"
import { FinanceApi } from "@/infrastructure/api/FinanceApi"

const financeApi = new FinanceApi()

export function useFinanceStatus() {
  return useQuery({
    queryKey: ["finance-status"],
    queryFn: () => financeApi.getFinanceStatus(),
    staleTime: 1000 * 60 * 5 // 5 minutos de cache
  })
}
