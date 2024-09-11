import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import PageLoading from "components/common/PageLoading"
import {
  useReadTokenErc20GetContractBalance,
  useReadTokenErc20GetFaucetBalance,
  useWriteTokenErc20Faucet,
} from "configs/generated"
import { wagmiConfig } from "configs/wagmi"
import { formatUnits, parseEther } from "ethers"
import useTransactionToast from "hooks/useTransactionToast"
import { useState } from "react"
import { useAccount, useBalance } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { TokenERC20 } from "../../../contracts/TokenERC20-address.json"
import { EthAddress, Hash } from "../pages/HomePage"

interface Props {
  onClose: () => void
}

export default function FaucetModal({ onClose }: Props) {
  const [amount, setAmount] = useState<number>()
  const { address } = useAccount()

  const { transactionToast } = useTransactionToast()

  const {
    data: balanceERC20,
    refetch: balanceERC20Refetch,
    isLoading: balanceERC20Loading,
  } = useBalance({
    address: address,
    token: TokenERC20 as EthAddress,
  })

  const {
    data: dataFaucetBalance,
    isLoading: faucetBalanceLoading,
    refetch: faucetBalanceRefetch,
  } = useReadTokenErc20GetFaucetBalance({
    address: TokenERC20 as EthAddress,
    args: address && [address],
  })

  const {
    data: dataContractBalance,
    refetch: contractBalanceRefetch,
    isLoading: contractBalanceLoading,
  } = useReadTokenErc20GetContractBalance({
    address: TokenERC20 as EthAddress,
  })

  const {
    writeContractAsync: erc20FaucetWriteContract,
    isPending: isPendingErc20Faucet,
  } = useWriteTokenErc20Faucet()

  const handleWithdrawERC20 = async (token: number) => {
    if (address && balanceERC20) {
      await erc20FaucetWriteContract({
        address: TokenERC20 as EthAddress,
        args: [parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([
            contractBalanceRefetch(),
            balanceERC20Refetch(),
            faucetBalanceRefetch(),
          ])
        })
      })
    }
  }

  if (balanceERC20Loading || faucetBalanceLoading || contractBalanceLoading) {
    return (
      <ModalBody className="max-h-80">
        <PageLoading />
      </ModalBody>
    )
  }

  const contractBalance =
    dataContractBalance && balanceERC20
      ? Number(formatUnits(dataContractBalance, balanceERC20.decimals))
      : 0

  const faucetBalance =
    dataFaucetBalance && balanceERC20
      ? Number(formatUnits(dataFaucetBalance, balanceERC20.decimals))
      : 0

  return (
    <>
      <ModalHeader className="flex flex-col gap-1 pb-0 text-center text-3xl">
        Faucet Tokens
      </ModalHeader>

      <ModalBody>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col text-xl">
            <div className="capitalize">Tokens left:</div>

            <div className="flex items-center text-secondary">
              <Icon
                icon="ic:outline-generating-tokens"
                className="pr-1 text-2xl"
              />
              <div className="text-2xl font-semibold text-secondary">
                {contractBalance.toLocaleString("en-US")}
              </div>
            </div>
          </div>
          <div className="flex flex-col text-xl">
            <div className="capitalize">fauceted token:</div>
            <div className="flex items-center text-secondary">
              <Icon
                icon="ic:outline-generating-tokens"
                className="pr-1 text-2xl"
              />
              <div className="text-2xl font-semibold">
                {faucetBalance.toLocaleString("en-US")}
              </div>
            </div>
          </div>
        </div>
        <Input
          label="Tokens"
          size="lg"
          type="number"
          variant="bordered"
          color="secondary"
          startContent={
            <Icon icon="material-symbols:wallet" className="text-xl" />
          }
          endContent={<Icon icon="healthicons:dollar" className="text-xl" />}
          placeholder="Enter tokens"
          value={amount ? amount.toString() : ""}
          onValueChange={(value) => {
            if (Number(value)) {
              if (Number(value) <= 0) {
                return setAmount(1)
              }
              setAmount(Number(value))
            }
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button
          color="secondary"
          onPress={() => {
            if (amount) {
              transactionToast({
                callbackAsync: handleWithdrawERC20(amount),
                loading: "Fauceting...",
                success: "Fauceted successfully",
                error: "Fauceted failed",
              })
            }
          }}
          isLoading={isPendingErc20Faucet}
          isDisabled={faucetBalance >= 1000000 || contractBalance <= 0 || false}
        >
          {faucetBalance >= 1000000
            ? "Faucet limit reached"
            : contractBalance <= 0
              ? "No tokens left to faucet"
              : "Submit"}
        </Button>
      </ModalFooter>
    </>
  )
}
