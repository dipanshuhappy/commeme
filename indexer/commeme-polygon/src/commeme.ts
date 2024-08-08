import { PoolCreated as PoolCreatedEvent, TokenDeployed as TokenDeployedEvent, LiquidityAdded as LiquidityAddedEvent } from "../generated/templates/Commeme/Commeme"
import { PoolCreated, TokenDeployed, LiquidityAdded } from "../generated/schema"

// Handler for PoolCreated event
export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.poolAddress = event.params.poolAddress
  entity.tokenA = event.params.tokenA
  entity.tokenB = event.params.tokenB
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// Handler for TokenDeployed event
export function handleTokenDeployed(event: TokenDeployedEvent): void {
  let entity = new TokenDeployed(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.tokenAddress = event.params.tokenAddress
  entity.tokenName = event.params.tokenName
  entity.tokenSymbol = event.params.tokenSymbol
  entity.totalSupply = event.params.totalSupply
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// Handler for LiquidityAdded event
export function handleLiquidityAdded(event: LiquidityAddedEvent): void {
  let entity = new LiquidityAdded(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.tokenA = event.params.tokenA
  entity.tokenB = event.params.tokenB
  entity.amountA = event.params.amountA
  entity.amountB = event.params.amountB
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}
