import { createConfig } from "@ponder/core";
import { parseAbiItem } from "abitype";
import { http } from "viem";

import { CommemeAbi } from "./abis/CommemeAbi";

const commemeFactoryEvent = parseAbiItem(
  "event CommemeCreated(address indexed commemeAddress, address indexed creator)",
);

export default createConfig({
  networks: {
    coredao: {
      chainId: 1116,
      transport: http(process.env.PONDER_RPC_URL_1116),
    },

  },
  contracts: {
    Commeme: {
      network: "coredao",
      abi: CommemeAbi,
      factory: {
        address: "0xbA1bf1B4C72d779f3dd21a8f29a70A82fD4dc3B7",
        event: commemeFactoryEvent,
        parameter: "commemeAddress",
      },
      startBlock: 16619840,
    },
  },
});
