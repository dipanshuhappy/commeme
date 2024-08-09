import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
    useProver
  } from "@anon-aadhaar/react";
  import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useChains, useWalletClient } from "wagmi";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { encodeFunctionData } from "viem";
import { CONSTANT_ADDRESSES, LEGACY_ABI } from "@/data/addresses-data";
import { toast } from "sonner";
import { SupportChainId } from "@/hooks/use-query-commemes";
import { TransactionToast } from "./ui/transaction-toast";
  
  export default function Anon() {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();

    const nullifierSeedString = "19566981402436238301701121519446139147227";
    const nullifierBigInt = BigInt(nullifierSeedString);
  
    useEffect(() => {
      console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }, [anonAadhaar]);

    const chains = useChains();
    const [selectedChain, setSelectedChain] = useState(1116)
    const chainsIds = chains.map((chain) => chain.id)
    const {data:wallet} = useWalletClient()

    
  
    return (
      <div className="w-full grid place-items-center">
      <div>
        <Label className="my-4">UBI FOR INDIAN CITIZEN POWERED BY COMMEME</Label>
        <h3>Login with aadhar to receive UBI(Universal Basic Income)</h3>
        <LogInWithAnonAadhaar  nullifierSeed={nullifierBigInt} />
        
      </div>
      <div >
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            {latestProof && (
              <><Label htmlFor="chain">Select Which Blockchain (It's gasless to receive)</Label><RadioGroup defaultValue={selectedChain.toString()} onValueChange={e => setSelectedChain(parseFloat(e))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={`${chainsIds[0]}`} id="option-one" />
                    <Label htmlFor="option-one">CoreDao</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={`${chainsIds[1]}`} id="option-two" />
                    <Label htmlFor="option-two">Polygon Mainnet</Label>
                  </div>
                </RadioGroup><Button onClick={async () => {
                    if(!wallet){
                      toast.error("Please connect your wallet")
                      throw new Error("Please connect your wallet")

                    }
                   const rawData = encodeFunctionData({
                    abi: LEGACY_ABI,
                    functionName: "getBack",
                    args: [
                      wallet.account.address
                    ],
                  });
                  const addresses = CONSTANT_ADDRESSES[selectedChain as SupportChainId];
                  console.log(rawData, "raw data");
                  console.log(`${import.meta.env.VITE_RELAY}/transaction`);
                  const res = await fetch(`${import.meta.env.VITE_RELAY}/transaction`, {
                    body: JSON.stringify({
                      to: addresses.legacyAddress,
                      data: rawData,
                      value: 0,
                      chainId: selectedChain,
                    }),
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  console.log({ res });
                  const responseJson = (await res.json()) as unknown as { hash: string };
                  toast.success(
                    <TransactionToast
                      hash={responseJson.hash}
                      title="Ubi Received Deployed"
                      scanner={`${addresses.scanner}/tx/`}
                    />
                  );
                 } }>Receive</Button></>
              )}
          </>
          )}
      </div>
      </div>
    );
  }