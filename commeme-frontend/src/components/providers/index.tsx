'use client';

import {PrivyProvider} from '@privy-io/react-auth';

import { TRPCReactProvider } from "~/trpc/react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {WagmiProvider} from '@privy-io/wagmi';
import { wagmiConfig } from '~/lib/config';
const queryClient = new QueryClient();
export default function Providers({children}: {children: React.ReactNode}) {

    return (
      <PrivyProvider
        appId="clzgtye730eel9yuvuj6dpphd"
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: 'https://your-logo-url',
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
         <QueryClientProvider client={queryClient}> 
          <TRPCReactProvider>
            <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
            
            
          </TRPCReactProvider>
        </QueryClientProvider>
       
        
      </PrivyProvider>
    );
  }