import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
