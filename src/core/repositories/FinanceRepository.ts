import type { FinanceStatus } from "../domain/Finance"

export interface FinanceRepository {
  getFinanceStatus(): Promise<FinanceStatus>
}
