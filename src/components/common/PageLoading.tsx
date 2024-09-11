import { Spinner } from "@nextui-org/react"

export default function PageLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <Spinner color="primary" size="lg" />
    </div>
  )
}
