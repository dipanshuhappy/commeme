'use client';

import {PrivyProvider} from '@privy-io/react-auth';

import { TRPCReactProvider } from "~/trpc/react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {WagmiProvider} from '@privy-io/wagmi';
import { coreDaoTestnet, wagmiConfig } from '~/lib/config';
import { polygonAmoy } from 'viem/chains';
import { State } from 'wagmi';
const queryClient = new QueryClient();
export default function Providers({children,initialState}: {children: React.ReactNode,initialState: State | undefined,}) {


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
          supportedChains:[coreDaoTestnet,polygonAmoy]
        }}
      >
         <QueryClientProvider client={queryClient}> 
          <TRPCReactProvider>
            <WagmiProvider config={wagmiConfig} initialState={initialState}>{children}</WagmiProvider>
            
            
          </TRPCReactProvider>
        </QueryClientProvider>
       
        
      </PrivyProvider>
    );
  }