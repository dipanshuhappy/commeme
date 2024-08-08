// import React from 'react'
import { HeroHighlight, Highlight } from "./ui/hero-highlight.tsx";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card.tsx";
import { If } from "react-if";
import { usePrivy } from "@privy-io/react-auth";
// import { Boxes } from './ui/background-boxes.tsx'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal.tsx";
import CreateMemeForm from "./create-meme-form.tsx";

export default function Hero() {
  const { authenticated } = usePrivy();
  return (
    <>
      {/* <Boxes/> */}

      <HeroHighlight className="dark">
        <div className="flex space-x-4 items-center">
          <div className="">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-1xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
              Revolutionize with Memes,{""}
              <Highlight className="text-black  dark:text-white">
                Empower the Meme Economy!
              </Highlight>
              <div className=" lg:text-2xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto my-3">
                Welcome to Commeme the ultimate platform where your memes can
                spark a revolution. Contribute to the meme economy and make
                degen positive sum. Let's Seize the memes of production !{" "}
              </div>
            </motion.h1>
            <If condition={authenticated}>
              <div className="flex justify-center items-center mt-4 space-x-3">
                <Modal>
                  <ModalTrigger>
                    <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 text-[15px]">
                      🐶 Create a meme
                    </button>
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent className="bg-black dark:bg-white dark:text-black text-white">
                      <CreateMemeForm />
                    </ModalContent>
                  </ModalBody>
                </Modal>

                <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 text-[15px]">
                  ❤️ Donate a meme
                </button>
              </div>
            </If>
          </div>
          <CardContainer className="inter-var">
            <CardBody className="relative   dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-orange-500 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-3 border bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  ">
              <CardItem translateZ="100" className="w-full rounded-md">
                <img
                  src="https://vitalik.eth.limo/images/dc/meme.jpeg"
                  alt="Commeme Logo"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </HeroHighlight>

      {/* <FeaturesSectionDemo/> */}
    </>
  );
}
