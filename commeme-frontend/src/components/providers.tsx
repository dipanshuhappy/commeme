
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/config";
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <QueryClientProvider client={queryClient}>
       
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>

  );
}
