import {createConfig} from '@privy-io/wagmi';
import { http, } from 'viem';
import {cookieStorage,
    createStorage} from "wagmi"
import { Chain, polygonAmoy } from 'wagmi/chains'
export const coreDaoTestnet = {
    id: 1115,
    name: 'coreDaoTestnet',
    rpcUrls:{
        default: {
            http: ['https://rpc.test.btcs.network']
        }
    },
    blockExplorers:{
        default:{
            name:"Core Dao Test Explorer",
            url:"https://scan.test.btcs.network"
        }
    },
    nativeCurrency:{
        name:"CORE",
        symbol:"CORE",
        decimals:18
    }
} as const satisfies Chain;
export const wagmiConfig = createConfig({
  chains: [coreDaoTestnet, polygonAmoy],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [coreDaoTestnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
})