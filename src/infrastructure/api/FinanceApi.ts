import { HttpClient } from "./HttpClient"
import type { FinanceStatus } from "@/core/domain/Finance"
import type { FinanceRepository } from "@/core/repositories/FinanceRepository"

export class FinanceApi extends HttpClient implements FinanceRepository {
  constructor() {
    super("https://api.hgbrasil.com/")
  }

  async getFinanceStatus(): Promise<FinanceStatus> {
    // A API retorna um wrapper, então vamos extrair o `results`
    const data = await this.get<{ results: FinanceStatus }>("finance")
    return data.results
  }
}
