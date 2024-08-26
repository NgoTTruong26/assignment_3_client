import { createConfig, http } from "wagmi"
import { bscTestnet, hardhat } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

export const wagmiConfig = createConfig({
  chains: [hardhat, bscTestnet],
  connectors: [metaMask()],
  transports: {
    [bscTestnet.id]: http(
      "https://bsc-testnet.infura.io/v3/317b537f510e4a40a6126d2ee0e11b92",
    ),
    [hardhat.id]: http("http://127.0.0.1:8545"),
  },
})
