import { createConfig } from "@ponder/core";
import { parseAbiItem } from "abitype";
import { http } from "viem";

import { CommemeAbi } from "./abis/CommemeAbi";
import { LlamaPolicyAbi } from "./abis/LlamaPolicyAbi";

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
        address: "0xf6655Af4A47cB6705Ae73EE0c8FAb6A1469d771c",
        event: commemeFactoryEvent,
        parameter: "commemeAddress",
      },
      startBlock: 16618418,
    },
  },
});
