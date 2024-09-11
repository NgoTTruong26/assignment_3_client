import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { useState } from "react"

interface Props {
  callback: (value: number) => void
  onClose: () => void
  innerHeader?: string
  placeholder?: string
  isLoading?: boolean
}

export default function EnterInputModal({
  callback,
  onClose,
  innerHeader,
  placeholder,
  isLoading,
}: Props) {
  const [amount, setAmount] = useState<number>()

  return (
    <>
      {innerHeader && (
        <ModalHeader className="flex flex-col gap-1">{innerHeader}</ModalHeader>
      )}
      <ModalBody>
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
          placeholder={placeholder}
          autoFocus
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
            if (Number(amount)) {
              callback(Number(amount))
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
