export interface WalletRecovery {
  id: string
  user_email: string
  encrypted_seed: string
  wallet_address: string
  recovery_type: string
  status: string
  created_at: string
  updated_at: string
}

export interface Portfolio {
  totalBalance: number
  balanceChange24h: number
  tokens: TokenBalance[]
}

export interface TokenBalance {
  symbol: string
  name: string
  balance: number
  value: number
  change24h: number
  chain: string
}