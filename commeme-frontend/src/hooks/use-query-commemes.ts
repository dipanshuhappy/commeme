import { CONSTANT_ADDRESSES } from '@/data/addresses-data'
import { Commeme, CommemeQueryResult } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
const query = gql`{
    commemes(orderBy: totalDonation, orderDirection: desc) {
    id
    commemeAddress
    creator
    isActive
    timeToClose
    threshold
    totalSupply
    name
    symbol
    tokenAddress
    metadata
    poolAddress
    totalDonation
    blockNumber
    blockTimestamp
    transactionHash
  }
}`
export type SupportChainId = keyof typeof CONSTANT_ADDRESSES

export const useQueryCommemes = (chainId:SupportChainId) => {
  return useQuery({

    queryKey: ['commemes'],
    refetchInterval: 7000,

    async queryFn() {
        const result = await request<CommemeQueryResult>(CONSTANT_ADDRESSES[chainId].graphql, query);
        const commemes = result.commemes;
  
        const enrichedCommemes = await Promise.all(commemes.map(async (commeme) => {
          try {
            const response = await fetch(commeme.metadata);
            const metadataJson = await response.json();
            return {
              ...commeme,
              image: metadataJson.image,
              description: metadataJson.description
            };
          } catch (error) {
            console.error(`Failed to fetch metadata for commeme ${commeme.id}:`, error);
            return commeme; // return the commeme without the enriched data if fetching fails
          }
        }));
  
        return enrichedCommemes as Commeme[];
      }

  })
}