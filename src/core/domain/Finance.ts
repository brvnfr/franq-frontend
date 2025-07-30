
// Principais tipos de entidades retornadas pela API
export interface Stock {
  name: string
  location: string
  points: number
  variation: number
}

export interface Bitcoin {
  name: string
  format: string
  last: number
  variation: number
}

export interface Currency {
  name: string
  buy: number
  sell: number
  variation: number
}

export interface FinanceStatus {
  stocks: Record<string, Stock>
  bitcoin: Bitcoin[]
  currencies: {
    source: string
    USD: Currency
    EUR: Currency
    BRL: Currency
  }
}
