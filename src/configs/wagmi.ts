import { createConfig, http } from "wagmi"
import { bscTestnet, hardhat } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

export const wagmiConfig = createConfig({
  chains: [hardhat, bscTestnet],
  connectors: [metaMask()],
  transports: {
    [bscTestnet.id]: http(
      "https://bsc-testnet.nodereal.io/v1/1234355755e141b1bbf1a81e398793af",
    ),
    [hardhat.id]: http("http://127.0.0.1:8545"),
  },
})
