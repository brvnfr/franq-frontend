import type { Payment } from "./types"

export const payments: Payment[] = [
  { customer: "Pedro Duarte", email: "pedro@email.com", amount: "R$ 1.000,00", status: "Aprovado" },
  { customer: "Ana Silva", email: "ana@email.com", amount: "R$ 580,00", status: "Pendente" },
  { customer: "Carlos Souza", email: "carlos@email.com", amount: "R$ 300,00", status: "Recusado" },
]
