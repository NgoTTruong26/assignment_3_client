import { Button, Image } from "@nextui-org/react"
import { Navigate } from "react-router-dom"
import { useChain } from "store/chain"
import { useAccount, useConnect } from "wagmi"

export default function ConnectWallet() {
  const { address, isConnecting } = useAccount()

  const { connectors, connect, isPending } = useConnect()
  const { chain } = useChain()

  if (address) {
    return <Navigate to="/" />
  }

  return (
    <div className="mb-10 flex justify-center px-default">
      <div className="mt-28 w-full max-w-default">
        <div className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-blue-50 p-20">
          <div className="text-center text-2xl font-semibold">
            Connect Your Wallet
          </div>
          <Image
            width={300}
            isBlurred
            src="https://dexlottery.com/images/lottery/required-connect-wallet.svg"
            alt="NextUI Album Cover"
            className="m-5"
            classNames={{
              wrapper: "!max-w-none",
            }}
          />
          <div className="flex justify-center">
            {connectors.map(
              (connector) =>
                connector.icon &&
                connector.name === "MetaMask" && (
                  <Button
                    size="lg"
                    radius="full"
                    isLoading={isPending || isConnecting}
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector, chainId: chain.id })
                    }}
                    className="font-semibold"
                    color="secondary"
                  >
                    Connect Wallet
                  </Button>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
