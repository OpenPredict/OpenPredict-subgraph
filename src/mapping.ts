import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import {
  OpenPredict,
  Transfer
} from "../generated/OpenPredict/OpenPredict"
import { Staking } from "../generated/schema"

const StakingContractAddress = Address.fromString('0x33a48a75d4bbf189b96fe17a72b8ae2162a60203');
const APY = BigDecimal.fromString("8.5");

export function handleTransfer(event: Transfer): void {

  // only continue should the Staking contract address be affected.
  if(!(event.params.to == StakingContractAddress || event.params.from == StakingContractAddress)){
    return;
  }

  // Set values
  let entity   = new Staking(StakingContractAddress.toHexString());
  let contract = OpenPredict.bind(event.address);
  entity.APY = APY;
  entity.OPT = contract.balanceOf(StakingContractAddress);
  entity.save();
}
