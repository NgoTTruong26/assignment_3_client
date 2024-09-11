import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import BigNumber from "bignumber.js"
import PageLoading from "components/common/PageLoading"
import {
  useReadMainContractDepositOf,
  useReadMainContractDepositOfNft,
  useReadMainContractGetAccumulatedInterest,
  useReadMainContractGetApr,
  useReadMainContractGetCurrentTime,
  useReadTokenErc721GetBalanceNft,
  useReadTokenErc721GetOwnedTokens,
} from "configs/generated"
import { queryClient } from "configs/queryClient"
import { useEffect } from "react"
import { formatDate } from "utils/time"
import { useAccount, useBalance } from "wagmi"
import { MainContract } from "../../../contracts/MainContract-address.json"
import { TokenERC20 } from "../../../contracts/TokenERC20-address.json"
import { TokenERC721 } from "../../../contracts/TokenERC721-address.json"
import ERC20Control from "../components/ERC20Control"
import NFTControl from "../components/NFTControl"

export type EthAddress = `0x${string}`

export type Hash = EthAddress

export default function HomePage() {
  const { address, isConnected } = useAccount()

  const { data: balanceERC20Staked, isLoading: balanceERC20StakedLoading } =
    useReadMainContractDepositOf({
      address: MainContract as EthAddress,
      args: address && [address],
    })

  const { data: balanceNFTStaked, isLoading: balanceNFTLoading } =
    useReadMainContractDepositOfNft({
      address: MainContract as EthAddress,
      args: address && [address],
    })

  const {
    data: accumulatedInterest,
    refetch: getAccumulatedInterestRefetch,
    isLoading: accumulatedInterestLoading,
  } = useReadMainContractGetAccumulatedInterest({
    address: MainContract as EthAddress,
    args: address && [address],
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

  const {
    data: APR,
    refetch: getAPRRefetch,
    isLoading: APRLoading,
  } = useReadMainContractGetApr({
    address: MainContract as EthAddress,
  })

  const { isLoading: currentTimeLoading } = useReadMainContractGetCurrentTime({
    address: MainContract as EthAddress,
  })

  const { isLoading: ownedTokensLoading } = useReadTokenErc721GetOwnedTokens({
    address: TokenERC721 as EthAddress,
    args: address && [address],
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
    balanceERC20 && accumulatedInterest
      ? Number(
          new BigNumber(accumulatedInterest.toString()).dividedBy(
            new BigNumber(10).pow(balanceERC20.decimals),
          ),
        )
      : 0

  useEffect(() => {
    if (isConnected) {
      queryClient.invalidateQueries()
    }
  }, [isConnected, queryClient, address])

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      getAccumulatedInterestRefetch()
      getAPRRefetch()
    }, 3000)

    return () => clearInterval(setIntervalId)
  }, [getAccumulatedInterestRefetch, getAPRRefetch])

  if (
    balanceERC20StakedLoading ||
    balanceNFTLoading ||
    accumulatedInterestLoading ||
    balanceERC20Loading ||
    balanceERC721Loading ||
    APRLoading ||
    currentTimeLoading ||
    ownedTokensLoading
  ) {
    return <PageLoading />
  }

  return (
    <div className="flex justify-center bg-blue-50 px-default pb-10 text-xl">
      <div className="mt-28 w-full max-w-default">
        <div className="flex gap-5">
          <div className="flex w-full max-w-[52rem] flex-col gap-5">
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
                    {balanceERC20Staked?.depositTime
                      ? formatDate(Number(balanceERC20Staked.depositTime))
                      : 0}
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
            <div className="flex flex-1 flex-col gap-5 rounded-xl bg-blue-100 p-10 shadow">
              <div className="font-semibold">
                {balanceERC721?.symbol} Staked
              </div>
              <div className="flex items-center text-5xl font-semibold text-secondary">
                {balanceNFTStaked?.length} {balanceERC721?.symbol}'s
              </div>
              <div className="flex">
                <div className="min-w-56 text-default-500">
                  Last staked at:{" "}
                </div>
                <div className="font-semibold">
                  {balanceERC20Staked?.depositNFTTime
                    ? formatDate(Number(balanceERC20Staked.depositNFTTime))
                    : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <ERC20Control />
            <NFTControl />
          </div>
        </div>
      </div>
    </div>
  )
}
