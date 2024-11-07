import { createConfig } from "@ponder/core";
import { parseAbiItem } from "abitype";
import { http } from "viem";

import { CommemeAbi } from "./abis/CommemeAbi";

const commemeFactoryEvent = parseAbiItem(
  "event CommemeCreated(address indexed commemeAddress, address indexed creator)",
);

export default createConfig({
  networks: {
    unichainSepolia: {
      chainId: 1301,
      transport: http(process.env.PONDER_RPC_URL_1301),
    },

  },
  contracts: {
    Commeme: {
      network: "unichainSepolia",
      abi: CommemeAbi,
      factory: {
        address: "0x7B0EC53Dfcdb0032f0336e6f53419FA48Bc8FAdb",
        event: commemeFactoryEvent,
        parameter: "commemeAddress",
      },
      startBlock: 4170409,
    },
  },
});
