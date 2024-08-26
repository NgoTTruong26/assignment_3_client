import { navPaths } from "constants/nav"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const ConnectWallet = lazy(() => import("modules/auth/pages/ConnectWallet"))

export const authRoute: RouteObject = {
  path: navPaths.auth,
  children: [
    {
      path: "",
      Component: ConnectWallet,
    },
  ],
}
