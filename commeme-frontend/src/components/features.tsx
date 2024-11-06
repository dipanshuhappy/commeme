
import { StickyScroll } from "./ui/sticky-scroll-reveal";
// import Image from "next/image";
 
const content = [
  {
    title: "Create a Meme",
    description:
      "Create a meme you think will go viral, and get the chance to incentivize your creativity from donations, also your meme being registered as a crypto token in the later stages of which you'll be the owner.ivize your creativity from donations, also your meme being registered as a crypto token in the later stages of which you'll be the owner.you can use our own meme template editor to create memes and people will explore yout memes in our explore page and they can donate through crypto",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
      <img
        src="https://clideo.com/files/content/twitter-meme-maker-1.png"
        width={500}
        height={500}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
    </div>
    ),
  },
  {
    title: "Donations",
    description:
      "Get Donations through donors all over the world on you memes, and get chance to become a author of you own meme token.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="data:image/png;base64,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"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Be the owner of your meme token" ,
    description:
      "Now battle with other meme lords and publicize your meme token the shit out of it by sharing it on social media and other platforms.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
      <img
        src="data:image/jpeg;base64,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"
        width={500}
        height={500}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
      </div>
    ),
  },
  {
    title: "Buy and sell meme tokens",
    description:
      "Constantly be aware of your token, and be safe from fraud buyers or sellers, who are intenionally trying to pump and dump your token, also some part oof your tokens will go to charity :)",
    content: (
      <div className="h-full w-full  lg:flex items-center justify-center text-white">
      <img
        src="/meme-templates/coin-2859345_1280.png"
        width={500}
        height={500}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-5 bg-black ">
      <StickyScroll content={content} />
    </div>
  );
}