// import { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import type { NextPage } from "next";
// import RotateIcon from "@icons/RotateIcon";
// import Counter from "@components/Counter";
// import { CardType, HistoryType, ResultType, SwipeType } from "types";
// import CARDS from "@data/cards";
// import Card from "@components/Card";
// import Head from "next/head";

import { SupportChainId, useQueryCommemes } from "@/hooks/use-query-commemes";
import ExpandableCardDemo from "./blocks/expandable-card-demo-grid";
import SwipeableStackCards from "./gesturs/swipe-card";
import { useChainId } from "wagmi";

export default function Explore() {
  const chainId = useChainId()
  const {data:commemes,status} = useQueryCommemes(chainId as SupportChainId)

  return(
 <div className="w-full h-full flex justify-center items-center">
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
      {/* <ExpandableCardDemo commemes={commemes ?? []} /> */}
      <SwipeableStackCards commemes={commemes ?? []} chainId={chainId as SupportChainId}/>
 </div>
);
};


