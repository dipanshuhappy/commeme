import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
require("@nomiclabs/hardhat-ethers");

const account1 = process.env.PRIVATE_KEY
const config: HardhatUserConfig = {
  defaultNetwork: "unichain",
  networks: {
    hardhat: {
    },
    unichain: {
      url: process.env.RPC_URL,
      accounts: [account1]
    }
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
