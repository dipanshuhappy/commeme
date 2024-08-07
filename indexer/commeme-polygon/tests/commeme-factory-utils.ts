import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { CommemeCreated } from "../generated/CommemeFactory/CommemeFactory"

export function createCommemeCreatedEvent(
  _id: BigInt,
  commemeAddress: Address,
  creator: Address
): CommemeCreated {
  let commemeCreatedEvent = changetype<CommemeCreated>(newMockEvent())

  commemeCreatedEvent.parameters = new Array()

  commemeCreatedEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  commemeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "commemeAddress",
      ethereum.Value.fromAddress(commemeAddress)
    )
  )
  commemeCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return commemeCreatedEvent
}
