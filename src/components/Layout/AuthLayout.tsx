import PageLoading from "components/common/PageLoading"
import { PropsWithChildren } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAccount } from "wagmi"

export default function AuthLayout({ children }: PropsWithChildren) {
  const { address, isConnecting } = useAccount()
  const { pathname } = useLocation()

  if (isConnecting && pathname !== "/auth") {
    return <PageLoading />
  }

  if (!address && pathname !== "/auth") {
    return <Navigate to="/auth" />
  }

  return children
}
