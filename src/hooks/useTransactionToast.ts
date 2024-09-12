import { toast } from "sonner"

interface Args {
  callbackAsync: Promise<void>
  successCallback?: () => void
  loading?: string
  success?: string
  error?: string
}

export default function useTransactionToast() {
  const transactionToast = ({
    callbackAsync,
    successCallback,
    loading,
    success,
    error,
  }: Args) => {
    toast.promise(callbackAsync, {
      loading: loading || "Loading...",
      success: () => {
        if (successCallback) successCallback()
        return success || "Successfully"
      },
      error: (err) => {
        if (err.message.includes("ERC20: insufficient allowance")) {
          return "ERC20: insufficient allowance"
        }

        if (err.message.includes("Timed out while waiting for transaction")) {
          return "Timed out while waiting for transaction"
        }
        return error || "Failed"
      },
    })
  }

  return { transactionToast }
}
