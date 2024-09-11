import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { useState } from "react"
import { EthAddress } from "../pages/HomePage"

export interface SendERC20Dto {
  address: EthAddress
  tokens: number
}

interface Props {
  callback: (value: SendERC20Dto) => void
  onClose: () => void
  isLoading?: boolean
}

export default function SendERC20Modal({
  callback,
  onClose,
  isLoading,
}: Props) {
  const [address, setAddress] = useState<string>("")
  const [amount, setAmount] = useState<number>()

  function isValidEthereumAddress(input: string) {
    const hexRegex = /^0x[0-9a-fA-F]{40}$/
    return hexRegex.test(input)
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Send ERC20</ModalHeader>

      <ModalBody>
        <Input
          label="Address"
          size="lg"
          variant="bordered"
          color="secondary"
          startContent={
            <Icon icon="ph:address-book-bold" className="text-xl" />
          }
          endContent={<Icon icon="ph:text-aa-bold" className="text-xl" />}
          placeholder="Enter address"
          autoFocus
          value={address}
          onValueChange={(value) => setAddress(value)}
          isInvalid={address ? !isValidEthereumAddress(address) : false}
          errorMessage="Please enter a valid Address"
        />
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
            if (amount && address) {
              callback({
                address: address as EthAddress,
                tokens: amount,
              })
            }
          }}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}
