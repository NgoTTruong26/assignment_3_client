import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { BaseGetList } from "types/getList"
import { Transaction } from "types/transaction.type"
import { sortedByDateTime } from "../pages/TransactionHistory"

export interface GetTransactionListRequest {
  page?: number
  perPage?: number
  keyword?: string
  sortedByDateTime?: sortedByDateTime
}

export interface GetTransactionListResponse extends BaseGetList {
  data: Transaction[]
}

export async function getTransactionList(params: GetTransactionListRequest) {
  return (
    await api.get<GetTransactionListResponse>(`/transactions`, {
      params,
    })
  ).data
}

export function useGetTransactionList({
  page = 1,
  perPage = 3,
  sortedByDateTime,
  keyword,
}: GetTransactionListRequest) {
  return useQuery({
    queryKey: ["getTransactionList", page, perPage, sortedByDateTime, keyword],
    queryFn: async () =>
      await getTransactionList({ page, perPage, sortedByDateTime, keyword }),
    refetchInterval: 10 * 1000,
  })
}
