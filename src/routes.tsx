import AuthLayout from "components/Layout/AuthLayout"
import MainLayout from "components/Layout/home"
import { navPaths } from "constants/nav"
import { authRoute } from "modules/auth/route"
import { homeRoute } from "modules/home/route"
import { transactionHistory } from "modules/transaction-history/route"
import { Navigate, useRoutes } from "react-router-dom"

export default function Routes() {
  const element = useRoutes([
    {
      path: "",
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: [homeRoute, authRoute, transactionHistory],
    },
    {
      path: "*",
      element: <Navigate to={navPaths.home} />,
    },
  ])
  return element
}
