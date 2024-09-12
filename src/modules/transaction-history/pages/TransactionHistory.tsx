import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Snippet,
} from "@nextui-org/react"
import clsx from "clsx"
import LoadingIcon from "components/common/LoadingIcon"
import PageLoading from "components/common/PageLoading"
import { useReadTokenErc721GetBalanceNft } from "configs/generated"
import debounce from "lodash.debounce"
import { EthAddress } from "modules/home/pages/HomePage"
import { useEffect, useRef, useState } from "react"
import { shortenAddress } from "utils/shortenAddress"
import { useAccount, useBalance } from "wagmi"
import { TokenERC20 } from "../../../contracts/TokenERC20-address.json"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"
import { useGetTransactionList } from "../services/getTransactionList"

export type sortedByDateTime = "asc" | "desc"

export const sortOptions: { key: sortedByDateTime; label: string }[] = [
  { key: "asc", label: "Date Time ascending" },
  { key: "desc", label: "Date Time descending" },
]

export default function TransactionHistory() {
  const { address } = useAccount()

  const [searchCharacters, setSearchCharacters] = useState<string>()
  const [sortedByDateTime, setSortedDateTime] = useState<sortedByDateTime>()
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(1)

  const {
    data,
    isLoading: getTransactionListLoading,
    isFetching: getTransactionListFetching,
  } = useGetTransactionList({
    page,
    perPage,
    sortedByDateTime,
    keyword: searchCharacters,
  })

  const { data: balanceERC20, isLoading: balanceERC20Loading } = useBalance({
    address: address,
    token: TokenERC20 as EthAddress,
  })

  const { data: balanceERC721, isLoading: balanceERC721Loading } =
    useReadTokenErc721GetBalanceNft({
      address: TokenERC721 as EthAddress,
      args: address && [address],
    })

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchCharacters(value)
    }, 500),
  ).current

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value))
    setPage(1)
  }

  useEffect(() => {
    debouncedSearch.cancel()
  }, [debouncedSearch])

  useEffect(() => {
    setPage(1)
  }, [searchCharacters])

  if (
    getTransactionListLoading ||
    balanceERC20Loading ||
    balanceERC721Loading
  ) {
    return <PageLoading />
  }

  return (
    <div className="flex flex-1 justify-center bg-blue-50 px-default pb-10">
      <div className="mt-28 w-full max-w-default">
        <div className="w-full overflow-x-auto rounded-xl p-4 shadow">
          <div className="flex flex-col gap-2 pb-3">
            <div className="flex h-full w-full flex-1 items-center gap-5">
              <Input
                size="lg"
                variant="bordered"
                color="secondary"
                placeholder="Search by Transaction Hash / Method / Block / From / To"
                startContent={<Icon icon="icon-park-outline:search" />}
                className="h-14 flex-1"
                classNames={{
                  inputWrapper: "h-full",
                }}
                onValueChange={debouncedSearch}
                endContent={
                  getTransactionListFetching && (
                    <div className="flex items-center">
                      <LoadingIcon size="sm" />
                    </div>
                  )
                }
              />
              <Select
                variant="bordered"
                label="Sort"
                className="h-full max-w-[200px]"
                color="secondary"
                onChange={(e) =>
                  setSortedDateTime(e.target.value as sortedByDateTime)
                }
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-small text-default-400">
                Total {data?.meta.total} transactions
              </span>
              <label className="flex items-center text-small text-default-400">
                Rows per page:
                <select
                  className="bg-transparent text-small text-default-400 outline-none"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
          <table className={clsx("table h-full w-full border-collapse")}>
            {/* head */}
            <thead className="sticky top-0 z-30 rounded-xl shadow-sm">
              <tr
                className={clsx(
                  "overflow-hidden [&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl [&>th]:bg-secondary [&>th]:p-3 [&>th]:text-start [&>th]:font-semibold [&>th]:capitalize [&>th]:text-white",
                )}
              >
                <th className="flex h-full items-center justify-center">
                  <Icon icon="ph:question" className="text-xl" />
                </th>
                <th>Transaction Hash</th>

                <th>Method</th>

                <th>Block</th>
                <th>Date Time (UTC)</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>NFTId</th>
                <th>Txn Fee</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((transaction, idx) => (
                <tr
                  key={idx}
                  className={clsx(
                    "border-b",
                    "[&>td]:px-3 [&>td]:py-5 [&>th]:px-3 [&>th]:py-5",
                  )}
                >
                  <td className="flex h-full items-center justify-center">
                    <Popover placement="right" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          variant="bordered"
                          size="sm"
                          isIconOnly
                          startContent={
                            <Icon icon="ph:eye" className="text-xl" />
                          }
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="font-bold">Additional Info</div>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1 border-b pb-2">
                              <div className="font-semibold">Status:</div>
                              <div className="flex items-center gap-2 text-success">
                                <Icon
                                  icon="ep:success-filled"
                                  className="text-xl text-success"
                                />
                                {transaction.status}
                              </div>
                            </div>
                            {transaction.transferFrom &&
                              transaction.transferTo &&
                              (transaction.amount ||
                                transaction.nftId ||
                                transaction.nftId === 0) && (
                                <div className="flex flex-col gap-1 border-b pb-2">
                                  <div className="font-semibold">
                                    Token Transfer:
                                  </div>
                                  {transaction.amount && (
                                    <div>
                                      <div className="flex items-center gap-1">
                                        <Icon
                                          icon="ic:outline-generating-tokens"
                                          className="text-xl text-secondary"
                                        />
                                        <span>
                                          {Number(
                                            transaction.amount,
                                          ).toLocaleString("en-US")}
                                        </span>
                                        <span className="text-secondary">
                                          {balanceERC20?.symbol}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        From
                                        <Snippet
                                          color="secondary"
                                          onCopy={() => {
                                            navigator.clipboard.writeText(
                                              transaction.transferFrom!,
                                            )
                                          }}
                                          size="lg"
                                          hideSymbol
                                          className="bg-transparent p-0 text-sm"
                                          classNames={{
                                            pre: "font-public-sans",
                                          }}
                                        >
                                          {shortenAddress(
                                            transaction.transferFrom,
                                          )}
                                        </Snippet>
                                        To
                                        <Snippet
                                          color="secondary"
                                          onCopy={() => {
                                            navigator.clipboard.writeText(
                                              transaction.transferTo!,
                                            )
                                          }}
                                          size="lg"
                                          hideSymbol
                                          className="bg-transparent p-0 text-sm"
                                          classNames={{
                                            pre: "font-public-sans",
                                          }}
                                        >
                                          {shortenAddress(
                                            transaction.transferTo,
                                          )}
                                        </Snippet>
                                      </div>
                                    </div>
                                  )}
                                  {(transaction.nftId ||
                                    transaction.nftId === 0) && (
                                    <div>
                                      <div className="flex items-center gap-1 text-secondary">
                                        <Icon
                                          icon="ri:nft-line"
                                          className="text-xl text-secondary"
                                        />
                                        <span>{balanceERC721?.name}</span>
                                        <span>({balanceERC721?.symbol})</span>
                                      </div>
                                      <div className="flex gap-1 pt-1">
                                        Token ID:{" "}
                                        <span className="text-secondary">
                                          {transaction.nftId}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        From
                                        <Snippet
                                          color="secondary"
                                          onCopy={() => {
                                            navigator.clipboard.writeText(
                                              transaction.transferFrom!,
                                            )
                                          }}
                                          size="lg"
                                          hideSymbol
                                          className="bg-transparent p-0 text-sm"
                                          classNames={{
                                            pre: "font-public-sans",
                                          }}
                                        >
                                          {shortenAddress(
                                            transaction.transferFrom,
                                          )}
                                        </Snippet>
                                        To
                                        <Snippet
                                          color="secondary"
                                          onCopy={() => {
                                            navigator.clipboard.writeText(
                                              transaction.transferTo!,
                                            )
                                          }}
                                          size="lg"
                                          hideSymbol
                                          className="bg-transparent p-0 text-sm"
                                          classNames={{
                                            pre: "font-public-sans",
                                          }}
                                        >
                                          {shortenAddress(
                                            transaction.transferTo,
                                          )}
                                        </Snippet>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            <div className="flex flex-col pb-2">
                              <div className="font-semibold">
                                Transaction Fee:
                              </div>
                              <div className="">
                                {transaction.gasPriceUsed.toLocaleString(
                                  "en-US",
                                )}{" "}
                                BNB
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td>
                    <Snippet
                      color="secondary"
                      onCopy={() => {
                        navigator.clipboard.writeText(
                          transaction.transactionHash,
                        )
                      }}
                      size="lg"
                      hideSymbol
                      className="bg-transparent p-0"
                      classNames={{
                        pre: "font-public-sans",
                      }}
                    >
                      {shortenAddress(transaction.transactionHash)}
                    </Snippet>
                  </td>
                  <td>
                    <Chip radius="sm" color="primary" variant="faded">
                      {transaction.eventName}
                    </Chip>
                  </td>

                  <td>{transaction.blockNumber.toLocaleString("en-US")}</td>
                  <td>
                    {new Date(transaction.dateTime)
                      .toISOString()
                      .substring(0, 10)}{" "}
                    {new Date(transaction.dateTime)
                      .toISOString()
                      .substring(11, 19)}
                  </td>
                  <td>
                    <Snippet
                      color="secondary"
                      onCopy={() => {
                        navigator.clipboard.writeText(transaction.from)
                      }}
                      size="lg"
                      hideSymbol
                      className="bg-transparent p-0"
                      classNames={{
                        pre: "font-public-sans",
                      }}
                    >
                      {shortenAddress(transaction.from)}
                    </Snippet>
                  </td>
                  <td>
                    <Snippet
                      onCopy={() => {
                        navigator.clipboard.writeText(
                          transaction.to
                            ? transaction.to
                            : transaction.contractAddress || "",
                        )
                      }}
                      size="lg"
                      hideSymbol
                      className="bg-transparent p-0"
                      classNames={{
                        pre: "font-public-sans",
                      }}
                    >
                      {transaction.to
                        ? shortenAddress(transaction.to)
                        : shortenAddress(transaction.contractAddress || "")}
                    </Snippet>
                  </td>
                  <td
                    className={clsx({
                      "text-center": !Number(transaction.amount),
                    })}
                  >
                    {Number(transaction.amount)
                      ? Number(transaction.amount).toLocaleString("en-US")
                      : "--"}
                  </td>
                  <td className="text-center">
                    {transaction.nftId || transaction.nftId === 0
                      ? transaction.nftId
                      : "--"}
                  </td>
                  <td>
                    {Number(transaction.gasPriceUsed.toLocaleString("en-US"))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pt-5">
            <Pagination
              showControls
              className="transition"
              color="secondary"
              page={page}
              total={data?.meta.lastPage || 1}
              variant="faded"
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
