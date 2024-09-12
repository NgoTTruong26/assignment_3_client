import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import BigNumber from "bignumber.js"
import EnterInputModal from "components/common/EnterInputModal"
import {
  useReadMainContractDepositOf,
  useReadMainContractGetAccumulatedInterest,
  useReadMainContractGetCurrentTime,
  useReadTokenErc20Allowance,
  useReadTokenErc721GetBalanceNft,
  useWriteMainContractClaimReward,
  useWriteMainContractDepositToken,
  useWriteMainContractTransferErc20,
  useWriteMainContractWithdraw,
  useWriteTokenErc20Approve,
} from "configs/generated"
import { wagmiConfig } from "configs/wagmi"
import { parseEther } from "ethers"
import useTransactionToast from "hooks/useTransactionToast"
import { useEffect, useState } from "react"
import { useAccount, useBalance } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { MainContract } from "../../../contracts/MainContract-address.json"
import { TokenERC20 } from "../../../contracts/TokenERC20-address.json"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"
import { EthAddress, Hash } from "../pages/HomePage"
import LockDepositCountdown from "./LockDepositCountdown"
import SendERC20Modal from "./SendERC20Modal"

export default function ERC20Control() {
  const [lockTime, setLockTime] = useState<number>()

  const [lockDepositERC20, setLockDepositERC20] = useState<boolean>(false)

  const { address } = useAccount()

  const { transactionToast } = useTransactionToast()

  const disclosureWithdrawERC20 = useDisclosure()
  const disclosureSendERC20 = useDisclosure()
  const disclosureDepositERC20 = useDisclosure()

  const { data: balanceERC20, refetch: balanceERC20Refetch } = useBalance({
    address: address,
    token: TokenERC20 as EthAddress,
  })

  const { data: currentTimeBlock, refetch: currentTimeBlockRefetch } =
    useReadMainContractGetCurrentTime({
      address: MainContract as EthAddress,
    })

  const { data: balanceERC20Staked, refetch: balanceERC20StakedRefetch } =
    useReadMainContractDepositOf({
      address: MainContract as EthAddress,
      args: address && [address],
    })

  const { refetch: getAccumulatedInterestRefetch } =
    useReadMainContractGetAccumulatedInterest({
      address: MainContract as EthAddress,
      args: address && [address],
    })

  const { data: allowanceERC20, refetch: allowanceERC20Refetch } =
    useReadTokenErc20Allowance({
      address: TokenERC20 as EthAddress,
      args:
        address && MainContract
          ? [address, MainContract as EthAddress]
          : undefined,
    })

  const { refetch: balanceERC721Refetch } = useReadTokenErc721GetBalanceNft({
    address: TokenERC721 as EthAddress,
    args: address && [address],
  })

  const {
    writeContractAsync: claimRewardWriteContract,
    isPending: isPendingClaimReward,
  } = useWriteMainContractClaimReward()

  const {
    writeContractAsync: withdrawERC20WriteContract,
    isPending: isPendingWithdrawERC20,
  } = useWriteMainContractWithdraw()

  const {
    writeContractAsync: approveERC20WriteContract,
    isPending: isPendingApproveERC20,
  } = useWriteTokenErc20Approve()

  const {
    writeContractAsync: transferERC20WriteContract,
    isPending: isPendingTransferERC20,
  } = useWriteMainContractTransferErc20()

  const {
    writeContractAsync: depositERC20WriteContract,
    isPending: isPendingDepositERC20,
  } = useWriteMainContractDepositToken()

  const handleClaimReward = async () => {
    if (address && balanceERC20) {
      await claimRewardWriteContract({
        address: MainContract as EthAddress,
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([
            balanceERC20StakedRefetch(),
            balanceERC20Refetch(),
            currentTimeBlockRefetch(),
            getAccumulatedInterestRefetch(),
          ])
        })
      })
    }
  }

  const handleWithdrawERC20 = async (token: number) => {
    if (address && balanceERC20) {
      await withdrawERC20WriteContract({
        address: MainContract as EthAddress,
        args: [parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([
            balanceERC20StakedRefetch(),
            balanceERC20Refetch(),
            currentTimeBlockRefetch(),
            getAccumulatedInterestRefetch(),
          ])
        })
      })
    }
  }

  async function handleApproveTransferERC20(
    toAddress: EthAddress,
    token: number,
  ) {
    if (address && balanceERC20)
      await approveERC20WriteContract({
        address: TokenERC20 as EthAddress,
        args: [MainContract as EthAddress, parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        })
          .then(() => allowanceERC20Refetch())
          .then(() => handleTransferERC20(toAddress, token))
      })
  }

  const handleTransferERC20 = async (toAddress: EthAddress, token: number) => {
    if (address) {
      await transferERC20WriteContract({
        address: MainContract as EthAddress,
        args: [toAddress, parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([balanceERC20Refetch(), allowanceERC20Refetch()])
        })
      })
    }
  }

  async function handleApproveDepositERC20(token: number) {
    if (address && balanceERC20)
      await approveERC20WriteContract({
        address: TokenERC20 as EthAddress,
        args: [MainContract as EthAddress, parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        })
          .then(() => allowanceERC20Refetch())
          .then(() => handleDepositERC20(token))
          .then(() =>
            Promise.all([
              currentTimeBlockRefetch(),
              balanceERC20StakedRefetch(),
            ]),
          )
      })
  }

  const handleDepositERC20 = async (token: number) => {
    if (address && balanceERC20) {
      await depositERC20WriteContract({
        address: MainContract as EthAddress,
        args: [parseEther(token.toString())],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(async () => {
          await Promise.all([
            balanceERC20StakedRefetch(),
            balanceERC20Refetch(),
            allowanceERC20Refetch(),
            balanceERC721Refetch(),
            currentTimeBlockRefetch(),
            getAccumulatedInterestRefetch(),
          ]).then(() => {
            if (balanceERC20Staked?.lockTime && currentTimeBlock) {
              const currentTime = Number(currentTimeBlock)
              const lockTime = Number(balanceERC20Staked.lockTime)
              console.log(currentTime, lockTime, "currentTime ")

              if (lockTime > currentTime) {
                console.log(currentTime, lockTime, "currentTime2")
                setLockTime(lockTime - currentTime)

                setLockDepositERC20(true)
              }
            }
          })
        })
      })

      return
    }
  }

  useEffect(() => {
    if (balanceERC20Staked?.lockTime && currentTimeBlock) {
      console.log("update")

      const currentTime = Number(currentTimeBlock)
      const lockTime = Number(balanceERC20Staked.lockTime)
      if (lockTime > currentTime) {
        setLockTime((_) => {
          return lockTime - currentTime
        })

        setLockDepositERC20(true)
      }
    }

    if (Number(balanceERC20Staked?.lockTime) < Number(currentTimeBlock)) {
      console.log(address)

      setLockTime(0)
      setLockDepositERC20(false)
    }
  }, [balanceERC20Staked?.lockTime, currentTimeBlock, address])

  const userTokenERC20 = balanceERC20
    ? Number(
        new BigNumber(balanceERC20.value.toString()).dividedBy(
          new BigNumber(10).pow(balanceERC20.decimals),
        ),
      )
    : undefined

  const allowanceTokenERC20 =
    allowanceERC20 !== undefined && balanceERC20
      ? new BigNumber(allowanceERC20.toString())
          .dividedBy(new BigNumber(10).pow(balanceERC20.decimals))
          .toString()
      : undefined

  return (
    <>
      <div className="rounded-xl p-10 shadow">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center space-x-2 text-4xl font-semibold text-secondary">
            <Icon icon="ic:outline-generating-tokens" />
            <span className="capitalize">{balanceERC20?.symbol}</span>
          </div>

          <div className="flex flex-col items-center gap-5 pt-2">
            <div className="flex items-center text-5xl font-semibold">
              <Icon
                icon="ic:outline-generating-tokens"
                className="pr-1 text-5xl"
              />
              {userTokenERC20?.toLocaleString("en-US")}
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col items-center justify-center gap-1">
                <Button
                  isIconOnly
                  color="secondary"
                  aria-label="Like"
                  radius="full"
                  className="h-16 w-16"
                  onPress={disclosureWithdrawERC20.onOpen}
                  isDisabled={lockDepositERC20}
                >
                  {lockTime && lockDepositERC20 ? (
                    <LockDepositCountdown
                      time={lockTime}
                      lockDepositERC20={lockDepositERC20}
                      setLockDepositERC20={setLockDepositERC20}
                    />
                  ) : (
                    <Icon
                      icon="hugeicons:money-receive-square"
                      className="text-3xl"
                    />
                  )}
                </Button>
                <div className="text-sm">Withdraw</div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <Button
                  isIconOnly
                  color="secondary"
                  aria-label="Like"
                  radius="full"
                  className="h-16 w-16"
                  onPress={disclosureSendERC20.onOpen}
                >
                  <Icon
                    icon="hugeicons:money-send-square"
                    className="text-3xl"
                  />
                </Button>
                <div className="text-sm">Send</div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <Button
                  isIconOnly
                  color="secondary"
                  aria-label="Like"
                  radius="full"
                  className="h-16 w-16"
                  onPress={disclosureDepositERC20.onOpen}
                >
                  <Icon icon="icon-park-outline:deposit" className="text-3xl" />
                </Button>
                <div className="text-sm">Deposit</div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <Button
                  isIconOnly
                  color="secondary"
                  aria-label="Like"
                  radius="full"
                  className="h-16 w-16"
                  onPress={() => {
                    transactionToast({
                      callbackAsync: handleClaimReward(),
                      loading: "Claim Rewarding...",
                      success: "Claim Rewarded successfully",
                      error: "Claim Rewarded failed",
                    })
                  }}
                  isLoading={isPendingClaimReward}
                >
                  <Icon icon="ph:gift-bold" className="text-3xl" />
                </Button>
                <div className="text-sm">Claim Reward</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="md"
        isOpen={disclosureWithdrawERC20.isOpen}
        onClose={disclosureWithdrawERC20.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <EnterInputModal
              callback={(value) => {
                console.log("value", value)

                transactionToast({
                  callbackAsync: handleWithdrawERC20(value),
                  successCallback: onClose,
                  loading: "Withdrawing...",
                  success: "Withdrew successfully",
                  error: "Withdrew failed",
                })
              }}
              innerHeader="Withdraw ERC20"
              placeholder="Enter tokens"
              isLoading={isPendingWithdrawERC20}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="md"
        isOpen={disclosureSendERC20.isOpen}
        onClose={disclosureSendERC20.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <SendERC20Modal
              callback={(value) => {
                transactionToast({
                  callbackAsync:
                    Number(allowanceTokenERC20) < value.tokens
                      ? handleApproveTransferERC20(value.address, value.tokens)
                      : handleTransferERC20(value.address, value.tokens),
                  successCallback: onClose,
                  loading: "Sending...",
                  success: "Sent successfully",
                  error: "Sent failed",
                })
              }}
              onClose={onClose}
              isLoading={isPendingTransferERC20 || isPendingApproveERC20}
            />
          )}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="md"
        isOpen={disclosureDepositERC20.isOpen}
        onClose={disclosureDepositERC20.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <EnterInputModal
              callback={(value) => {
                transactionToast({
                  callbackAsync:
                    Number(allowanceTokenERC20) < value
                      ? handleApproveDepositERC20(value)
                      : handleDepositERC20(value),
                  successCallback: onClose,
                  loading: "Depositing...",
                  success: "Deposited successfully",
                  error: "Deposited failed",
                })
              }}
              innerHeader="Deposit ERC20"
              placeholder="Enter tokens"
              isLoading={isPendingDepositERC20 || isPendingApproveERC20}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
