import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { abi as myContractAbi } from "./src/contracts/MainContract.json"
import { abi as tokenERC20Abi } from "./src/contracts/TokenERC20.json"
import { abi as TokenERC721Abi } from "./src/contracts/TokenERC721.json"

export default defineConfig({
  out: "src/hooks/generated.ts",
  contracts: [
    {
      name: "MainContract",
      abi: myContractAbi as any,
    },
    {
      name: "TokenERC20",
      abi: tokenERC20Abi as any,
    },
    {
      name: "TokenERC721",
      abi: TokenERC721Abi as any,
    },
  ],
  plugins: [react()],
})
