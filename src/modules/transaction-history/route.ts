import { navPaths } from "constants/nav"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const TransactionHistory = lazy(
  () => import("modules/transaction-history/pages/TransactionHistory"),
)

export const transactionHistory: RouteObject = {
  path: navPaths.transactionHistory,
  children: [
    {
      path: "",
      Component: TransactionHistory,
    },
  ],
}
