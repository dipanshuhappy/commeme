
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/config";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnonAadhaarProvider _useTestAadhaar={true}>
      <QueryClientProvider client={queryClient}>
       
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
      </AnonAadhaarProvider>

  );
}
