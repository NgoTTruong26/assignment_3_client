import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Chain {
  id: number
  name: string
}

export interface ChainState {
  chain: Chain

  setChain(chain: Chain): void
  clear(): void
}

export const defaultChainState: { chain: Chain } = {
  chain: {
    id: 97,
    name: "Binance Smart Chain Testnet",
  },
}

export const useChain = create<ChainState>()(
  persist(
    (set, state) => ({
      ...defaultChainState,
      setChain: (chain) => set({ chain: { ...state().chain, ...chain } }),
      clear: () => set({ ...defaultChainState }),
    }),
    {
      name: "chain", // name of the item in the storage (must be unique)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["chain"].includes(key)),
        ),
    },
  ),
)
