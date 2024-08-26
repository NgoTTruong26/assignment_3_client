import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, Tab, Tabs } from "@nextui-org/react"
import BigNumber from "bignumber.js"
import {
  useReadMainContractDepositOf,
  useReadMainContractDepositOfNft,
  useReadMainContractGetApr,
  useReadTokenErc721GetBalanceNft,
} from "hooks/generated"
import { useAccount, useBalance } from "wagmi"
import { MainContract } from "../../../contracts/MainContract-address.json"
import { TokenERC20 } from "../../../contracts/TokenERC20-address.json"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"

type EthAddress = `0x${string}`

type Hash = EthAddress

export default function HomePage() {
  const { address } = useAccount()

  const {
    data: balanceERC20Staked,
    refetch: balanceERC20StakedRefetch,
    isLoading: balanceERC20StakedLoading,
  } = useReadMainContractDepositOf({
    address: MainContract as EthAddress,
    args: address && [address],
  })

  const { data: balanceNFTStaked } = useReadMainContractDepositOfNft({
    address: MainContract as EthAddress,
    args: address && [address],
  })

  const {
    data: balanceERC20,
    refetch: balanceERC20Refetch,
    isLoading: balanceERC20Loading,
  } = useBalance({
    address: address,
    token: TokenERC20 as EthAddress,
  })

  const {
    data: balanceERC721,
    refetch: balanceERC721Refetch,
    isLoading: balanceERC721Loading,
  } = useReadTokenErc721GetBalanceNft({
    address: TokenERC721 as EthAddress,
    args: address && [address],
  })

  const { data: APR } = useReadMainContractGetApr({
    address: MainContract as EthAddress,
  })

  const userBalanceERC20Staked =
    balanceERC20Staked && balanceERC20
      ? Number(
          new BigNumber(balanceERC20Staked.amount.toString()).dividedBy(
            new BigNumber(10).pow(balanceERC20.decimals),
          ),
        )
      : undefined
  const userAccumulatedInterest =
    balanceERC20Staked && balanceERC20
      ? Number(
          new BigNumber(
            balanceERC20Staked.accumulatedInterest.toString(),
          ).dividedBy(new BigNumber(10).pow(balanceERC20.decimals)),
        )
      : undefined

  const userTokenERC20 = balanceERC20
    ? Number(
        new BigNumber(balanceERC20.value.toString()).dividedBy(
          new BigNumber(10).pow(balanceERC20.decimals),
        ),
      )
    : undefined

  return (
    <div className="flex justify-center bg-blue-50 px-default pb-10 text-xl">
      <div className="mt-28 w-full max-w-default">
        <div className="flex gap-5">
          <div className="flex w-full max-w-4xl flex-col gap-5">
            <div className="flex flex-col gap-5 rounded-xl bg-blue-100 shadow">
              <div className="flex flex-col gap-5 px-10 pt-5">
                <div className="font-semibold">
                  {balanceERC20?.symbol} Staked
                </div>
                <div className="flex items-center text-5xl font-semibold text-secondary">
                  <Icon
                    icon="ic:outline-generating-tokens"
                    className="pr-1 text-5xl"
                  />
                  {userBalanceERC20Staked?.toLocaleString("en-US")}
                </div>
                <div className="flex">
                  <div className="min-w-56 text-default-500">
                    Last staked at:{" "}
                  </div>
                  <div className="font-semibold">
                    {balanceERC20Staked?.depositTime.toString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-blue-200 px-10 pb-5 pt-3">
                <div className="flex">
                  <div className="min-w-56 text-default-500">APR:</div>
                  <div className="font-semibold">{APR?.toString()}%</div>
                </div>
                <div className="flex">
                  <div className="min-w-56 text-default-500">APR increase:</div>
                  <div className="font-semibold">
                    {balanceERC20Staked?.APRIncrement}%
                  </div>
                </div>
                <div className="flex">
                  <div className="min-w-56 text-default-500">
                    Accumulated Interest:
                  </div>
                  <div className="flex items-center font-semibold">
                    <Icon
                      icon="ic:outline-generating-tokens"
                      className="text-xl"
                    />
                    {userAccumulatedInterest?.toLocaleString("en-US")}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-xl bg-blue-100 p-10 shadow">
              <div className="font-semibold">
                {balanceERC721?.symbol} Staked
              </div>
              <div className="flex items-center text-5xl font-semibold text-secondary">
                {balanceNFTStaked?.length} {balanceERC721?.symbol}'s
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-xl p-10 shadow">
              <div className="flex flex-col items-center justify-center gap-1">
                <Tabs
                  size="lg"
                  variant="bordered"
                  color="secondary"
                  aria-label="Tabs colors"
                  radius="full"
                >
                  <Tab
                    key="erc20"
                    title={
                      <div className="flex items-center space-x-2">
                        <Icon
                          icon="ic:outline-generating-tokens"
                          className="text-2xl"
                        />
                        <span className="capitalize">
                          {balanceERC20?.symbol}
                        </span>
                      </div>
                    }
                  >
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
                          >
                            <Icon
                              icon="icon-park-outline:deposit"
                              className="text-3xl"
                            />
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
                          >
                            <Icon icon="ph:gift-bold" className="text-3xl" />
                          </Button>
                          <div className="text-sm">Claim Reward</div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="erc721"
                    title={
                      <div className="flex items-center space-x-2">
                        <Icon icon="ri:nft-line" className="text-2xl" />
                        <span className="capitalize">
                          {balanceERC721?.symbol}
                        </span>
                      </div>
                    }
                  />
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
