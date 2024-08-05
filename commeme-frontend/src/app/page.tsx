"use client";

import { useLogin } from "@privy-io/react-auth";
import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";


export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  const {login} = useLogin()

  return (
    // <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Button onClick={()=>{
          login()
        }}>Connect</Button>
          {/* <LatestPost /> */}
        
      </main>
    // </HydrateClient>
  );
}
