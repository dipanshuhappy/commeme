import { PoolCreated as PoolCreatedEvent, TokenDeployed as TokenDeployedEvent, LiquidityAdded as LiquidityAddedEvent,CommemeCreated as CommemeCreatedEvent,Donation as DonationEvent  } from "../generated/templates/Commeme/Commeme"
import { PoolCreated, TokenDeployed, LiquidityAdded,Commeme, CommemeRegistered,Donation } from "../generated/schema"

import {BigInt,Bytes} from "@graphprotocol/graph-ts"
// Handler for CommemeCreated event
export function handleCommemeCreated(event: CommemeCreatedEvent): void {
  let entity = new CommemeRegistered(event.address.toString())
  entity.sender = event.params.sender
  entity.metadata = event.params.metadata
  entity.threshold = event.params.threshold
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.totalSupply = event.params.totalSupply
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  

  let entityCommeme = new Commeme(event.address.toHexString())
  entityCommeme.creator = event.params.sender;
  entityCommeme.metadata = event.params.metadata;
  entityCommeme.threshold = event.params.threshold;
  entityCommeme.name = event.params.name;
  entityCommeme.symbol = event.params.symbol;
  entityCommeme.totalSupply = event.params.totalSupply;
  entityCommeme.blockNumber = event.block.number;
  entityCommeme.blockTimestamp = event.block.timestamp;
  entityCommeme.transactionHash = event.transaction.hash;
  
  entityCommeme.timeToClose = event.block.timestamp.plus(BigInt.fromI32(86400))

  entityCommeme.tokenAddress = Bytes.fromHexString("0x0000000000000000000000000000000000000000")
  entityCommeme.totalDonation = BigInt.fromI32(0)

  entityCommeme.commemeAddress = Bytes.fromHexString(event.address.toHexString())
  entityCommeme.isActive = true;
  entityCommeme.poolAddress = "0x0000000000000000000000000000000000000000";

  entityCommeme.save()
  entity.save()
}


// Handler for Donation event
export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  
  entity.isActive = event.params.isActive
  entity.totalDonationAmount = event.params.totalDonationAmount
  entity.currentDonation = event.params.currentDonation
  entity.timeToClose = event.params.timeToClose
  entity.token = event.params.token
  entity.donor = event.params.donor
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let entityComme = Commeme.load(event.address.toHexString())
  if(!entityComme){
    throw new Error("entity not found")
  }
  entityComme.isActive = event.params.isActive;
  entityComme.totalDonation = event.params.totalDonationAmount;
  entity.timeToClose = event.params.timeToClose;
  entity.token = event.params.token;
  entityComme.save()
  entity.save()
}

// Handler for PoolCreated event
export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  
  entity.poolAddress = event.params.poolAddress
  entity.tokenA = event.params.tokenA
  entity.tokenB = event.params.tokenB
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let entityComme = Commeme.load(event.address.toString())
  if(!entityComme){
    throw new Error("Error entity")
  }
  entityComme.poolAddress = event.params.poolAddress.toHexString();


  entityComme.save()
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

  let commeEntity = Commeme.load(event.address.toHexString())
  if(!commeEntity){
    throw new Error("Error entity")
  }
  commeEntity.tokenAddress = event.params.tokenAddress;
  commeEntity.name = event.params.tokenName;
  commeEntity.symbol = event.params.tokenSymbol;
  commeEntity.totalSupply = event.params.totalSupply;
  commeEntity.save()
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
