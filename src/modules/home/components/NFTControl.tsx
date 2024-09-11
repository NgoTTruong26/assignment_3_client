import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import { useReadTokenErc721GetBalanceNft } from "configs/generated"
import { useAccount } from "wagmi"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"
import { EthAddress } from "../pages/HomePage"
import DepositNFTModal from "./DepositNFTModal"
import SendNFTModal from "./SendNFTModal"
import WithdrawNFTModal from "./WithdrawNFTModal"

export default function NFTControl() {
  const { address } = useAccount()

  const disclosureDepositNFT = useDisclosure()
  const disclosureSendNFT = useDisclosure()
  const disclosureWithdrawNFT = useDisclosure()

  const { data: balanceERC721 } = useReadTokenErc721GetBalanceNft({
    address: TokenERC721 as EthAddress,
    args: address && [address],
  })

  return (
    <>
      <div className="rounded-xl p-10 shadow">
        <div className="flex flex-col items-center gap-5 pt-2">
          <div className="flex items-center space-x-2 text-4xl font-semibold text-secondary">
            <Icon icon="ri:nft-line" />
            <span className="capitalize">{balanceERC721?.symbol}</span>
          </div>
          <div className="flex items-center text-5xl font-semibold">
            <Icon icon="ri:nft-line" className="pr-1 text-5xl" />
            {Number(balanceERC721?.balance)} {balanceERC721?.symbol}
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <Button
                isIconOnly
                color="secondary"
                aria-label="Like"
                radius="full"
                className="h-16 w-16"
                onPress={disclosureWithdrawNFT.onOpen}
              >
                <Icon
                  icon="hugeicons:money-receive-square"
                  className="text-3xl"
                />
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
                onPress={disclosureSendNFT.onOpen}
              >
                <Icon icon="hugeicons:money-send-square" className="text-3xl" />
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
                onPress={disclosureDepositNFT.onOpen}
              >
                <Icon icon="icon-park-outline:deposit" className="text-3xl" />
              </Button>
              <div className="text-sm">Deposit</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        isOpen={disclosureDepositNFT.isOpen}
        onClose={disclosureDepositNFT.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => <DepositNFTModal onClose={onClose} />}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        isOpen={disclosureSendNFT.isOpen}
        onClose={disclosureSendNFT.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => <SendNFTModal onClose={onClose} />}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        isOpen={disclosureWithdrawNFT.isOpen}
        onClose={disclosureWithdrawNFT.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => <WithdrawNFTModal onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  )
}
