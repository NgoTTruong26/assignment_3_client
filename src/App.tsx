import { NextUIProvider } from "@nextui-org/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ScrollToTop from "components/common/ScrollToTop"
import { wagmiConfig } from "configs/wagmi"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { WagmiProvider } from "wagmi"
import PageLoading from "./components/common/PageLoading"
import { queryClient } from "./configs/queryClient"
import Routes from "./routes"

export default function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
      <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<PageLoading />}>
              <ScrollToTop />
              <Routes />
            </Suspense>
            <ReactQueryDevtools />
            <Toaster position="bottom-right" richColors />
          </QueryClientProvider>
        </WagmiProvider>
      </NextUIProvider>
    </BrowserRouter>
  )
}
