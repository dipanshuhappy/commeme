// import { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import type { NextPage } from "next";
// import RotateIcon from "@icons/RotateIcon";
// import Counter from "@components/Counter";
// import { CardType, HistoryType, ResultType, SwipeType } from "types";
// import CARDS from "@data/cards";
// import Card from "@components/Card";
// import Head from "next/head";

import ExpandableCardDemo from "./blocks/expandable-card-demo-grid";
import SwipeableStackCards from "./gesturs/swipe-card";

export default function Explore() {
  return(
 <div className="w-full h-full flex justify-center items-center">
{/* <ExpandableCardDemo/> */}
<SwipeableStackCards />
 </div>
);
};


