import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
    useProver
  } from "@anon-aadhaar/react";
  import { useEffect } from "react";
  
  export default function Anon() {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();

    const nullifierSeedString = "19566981402436238301701121519446139147227";
    const nullifierBigInt = BigInt(nullifierSeedString);
  
    useEffect(() => {
      console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }, [anonAadhaar]);
  
    return (
      <>
      <div>
        <LogInWithAnonAadhaar nullifierSeed={nullifierBigInt} />
        <p>{anonAadhaar?.status}</p>
      </div>
      <div >
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            {latestProof && (
                <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
              )}
          </>
          )}
      </div>
      </>
    );
  }