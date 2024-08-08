import { coreDao, polygon } from "viem/chains";

export const CONSTANT_ADDRESSES = {
    137:{
        factoryAddress: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
        routerAddress: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
        wrapAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        commemeFactory: "0xdCcF514720AABBfFF6bed7a7Db4b498677EfD3D3",
        scanner: "https://polygonscan.com",
        graphql: "https://api.studio.thegraph.com/query/85941/commeme/version/latest",
        tokenName: "MATIC",
        chain:polygon
    },
    1116:{
        factoryAddress: "0xB45e53277a7e0F1D35f2a77160e91e25507f1763",
        routerAddress: "0x9B3336186a38E1b6c21955d112dbb0343Ee061eE",
        wrapAddress: "0x191e94fa59739e188dce837f7f6978d84727ad01",
        commemeFactory: "0x",
        scanner:"https://scan.coredao.org",
        graphql: "https://api.studio.thegraph.com/query/85941/commeme-testnet/version/latest",
        tokenName: "CORE",
        chain:coreDao
    }
} as const;