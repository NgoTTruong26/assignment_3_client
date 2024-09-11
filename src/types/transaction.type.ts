type Status = "success" | "reverted"

export interface Transaction {
  id: number
  transactionHash: string
  status: Status
  blockNumber: number
  dateTime: Date
  from: string
  to?: string
  contractAddress?: string
  eventName: string
  transferFrom?: string
  transferTo?: string
  nftId?: number
  amount?: number
  gasPriceUsed: number
  createdAt: Date
  updatedAt: Date
}
