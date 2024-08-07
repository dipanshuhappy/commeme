import { CommemeCreated as CommemeCreatedEvent } from "../generated/CommemeFactory/CommemeFactory"
import { CommemeCreated } from "../generated/schema"

export function handleCommemeCreated(event: CommemeCreatedEvent): void {
  let entity = new CommemeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._id = event.params._id
  entity.commemeAddress = event.params.commemeAddress
  entity.creator = event.params.creator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
