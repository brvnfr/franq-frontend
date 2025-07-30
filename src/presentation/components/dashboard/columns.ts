export interface Payment {
  customer: string
  email: string
  amount: string
  status: string
}

export const columns = [
  {
    header: "Cliente",
    cell: (row: Payment) => row.customer,
  },
  {
    header: "E-mail",
    cell: (row: Payment) => row.email,
  },
  {
    header: "Valor",
    cell: (row: Payment) => row.amount,
  },
  {
    header: "Status",
    cell: (row: Payment) => row.status,
  },
]