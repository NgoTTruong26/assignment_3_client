import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Checkbox,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import {
  useReadMainContractDepositOf,
  useReadMainContractDepositOfNft,
  useReadTokenErc721GetBalanceNft,
  useWriteMainContractWithdrawNft,
} from "configs/generated"
import { wagmiConfig } from "configs/wagmi"
import useTransactionToast from "hooks/useTransactionToast"
import { useState } from "react"
import { useAccount } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { MainContract } from "../../../contracts/MainContract-address.json"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"
import { EthAddress, Hash } from "../pages/HomePage"
import NFTCheckbox from "./NFTCheckbox"

interface Props {
  onClose: () => void
}

export default function WithdrawNFTModal({ onClose }: Props) {
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([])

  const { address } = useAccount()
  const { transactionToast } = useTransactionToast()

  const { data: ownedTokens, refetch: ownedTokensRefetch } =
    useReadMainContractDepositOfNft({
      address: MainContract as EthAddress,
      args: address && [address],
    })

  const { refetch: balanceERC721Refetch } = useReadTokenErc721GetBalanceNft({
    address: TokenERC721 as EthAddress,
    args: address && [address],
  })

  const { refetch: depositOfNftRefetch } = useReadMainContractDepositOfNft({
    address: MainContract as EthAddress,
    args: address && [address],
  })

  const { refetch: depositOfERC20Refetch } = useReadMainContractDepositOf({
    address: MainContract as EthAddress,
    args: address && [address],
  })

  const {
    writeContractAsync: withdrawNftWriteContract,
    isPending: isPendingWithdrawNft,
  } = useWriteMainContractWithdrawNft()

  const handleDepositNFT = async (NFTs: number[]) => {
    if (address) {
      await withdrawNftWriteContract({
        address: MainContract as EthAddress,
        args: [NFTs.map((NFTId) => BigInt(NFTId))],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([
            ownedTokensRefetch(),
            balanceERC721Refetch(),
            depositOfNftRefetch(),
            depositOfERC20Refetch(),
          ])
        })
      })

      return
    }
  }

  const isCheckedAll: () => boolean = () => {
    if (ownedTokens && selectedNFTs.length > 0) {
      return ownedTokens.every((tokenId) =>
        selectedNFTs.includes(Number(tokenId)),
      )
    }

    return false
  }

  const handleCheckedAll = () => {
    if (ownedTokens) {
      if (isCheckedAll()) {
        setSelectedNFTs([])
      } else {
        setSelectedNFTs(ownedTokens.map((tokenId) => Number(tokenId)))
      }
    }
  }

  const handleChecked = (NFTId: number) => {
    if (selectedNFTs.includes(NFTId)) {
      setSelectedNFTs(selectedNFTs.filter((id) => id !== NFTId))
    } else {
      setSelectedNFTs([...selectedNFTs, NFTId])
    }
  }

  console.log("selectedNFTs", selectedNFTs)

  //console.log("isCheckedAll", isCheckedAll())

  const SortNFTs = (NFTs?: readonly bigint[]) => {
    if (NFTs && NFTs.length > 0) {
      const newNFTs = [...NFTs]
      return newNFTs.sort((a, b) => Number(a) - Number(b))
    }
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1 pb-0 text-center text-3xl">
        Withdraw NFT
      </ModalHeader>

      <ModalBody>
        <div className="flex justify-between gap-5 pr-1">
          <div className="font-semibold">Select NFTs</div>
          {ownedTokens && ownedTokens.length > 0 && (
            <Checkbox
              color="secondary"
              onChange={handleCheckedAll}
              isSelected={isCheckedAll()}
              classNames={{
                label: "font-semibold",
              }}
            >
              All
            </Checkbox>
          )}
        </div>
        <div className="flex max-h-64 flex-wrap justify-between gap-2 overflow-y-auto pr-1">
          {SortNFTs(ownedTokens) ? (
            SortNFTs(ownedTokens)!.map((tokenId, idx) => (
              <NFTCheckbox
                key={idx}
                wrapperClass="flex-[1_1_48%] max-w-[48%]"
                NFTId={Number(tokenId)}
                selectedNFTs={selectedNFTs}
                handleSelectedNFT={handleChecked}
              />
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center font-semibold text-secondary-400">
              <Icon icon="ri:nft-line" className="pr-1 text-8xl" />
              <div className="text-2xl">You don't have any available NFTs</div>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button
          color="secondary"
          onPress={() => {
            if (selectedNFTs.length > 0) {
              transactionToast({
                callbackAsync: handleDepositNFT(selectedNFTs),
                loading: "Withdrawing NFT...",
                success: "Withdrew NFT successfully",
                error: "Withdrew NFT failed",
              })
            }
          }}
          isLoading={isPendingWithdrawNft}
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}
