import { Checkbox, User } from "@nextui-org/react"
import clsx from "clsx"
import { cn } from "utils/cn"

interface Props {
  NFTId: number
  wrapperClass?: string
  selectedNFTs: number[]
  handleSelectedNFT: (NFTId: number) => void
}

export default function NFTCheckbox({
  NFTId,
  wrapperClass,
  selectedNFTs,
  handleSelectedNFT,
}: Props) {
  return (
    <Checkbox
      color="secondary"
      aria-label={NFTId.toString()}
      classNames={{
        base: cn([
          clsx(
            "inline-flex max-w-md w-full bg-content1 m-0 bg-default-50",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-secondary",
          ),
          wrapperClass,
        ]),
        label: "w-full ",
      }}
      value={NFTId.toString()}
      isSelected={selectedNFTs.includes(NFTId)}
      onChange={() => handleSelectedNFT(NFTId)}
    >
      <div className="flex w-full justify-between gap-2">
        <User
          avatarProps={{
            size: "md",
            src: "https://www.coindesk.com/resizer/LDfihh84I-kLzPrDZLv-jWeRE_E=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/7EM7S35XARDYVBVLCDVSYN7VBQ.jpg",
          }}
          description={<div>{NFTId}</div>}
          name="Id"
        />
      </div>
    </Checkbox>
  )
}
