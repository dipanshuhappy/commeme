import { Chain } from "wagmi/chains";
import { create } from "zustand"
import { persist } from "zustand/middleware"
type BlockchainNetwork = {
    chain: Chain;
}
interface  BlockchainNetworkStore{
    currentNetwork?: BlockchainNetwork;
    setCurrentNetwork: (network: BlockchainNetwork) => void;

}

export const useBlockchainNetwork = create(
    persist<BlockchainNetworkStore>(
        (set, get) => ({
            currentNetwork: undefined,
            setCurrentNetwork(network) {
                set({ currentNetwork: network });
            },
        }),{
            name: 'app-user-storage',
          }
    )
)