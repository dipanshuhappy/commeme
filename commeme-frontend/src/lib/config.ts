
import { http ,createConfig} from 'wagmi';
import { Chain, coreDao, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains';


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

export const config = createConfig({
  chains: [coreDao, polygon], // Pass your required chains as an array
  transports: {
    [coreDao.id]: http(),
    [polygon.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});