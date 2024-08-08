// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";

contract AnonAadhaarReward {
    address public anonAadhaarVerifierAddr;
    uint256 public rewardAmount; 

    event UserVerifiedAndRewarded(address user, uint256 amount);

    constructor(address _verifierAddr, uint256 _rewardAmount) {
        anonAadhaarVerifierAddr = _verifierAddr;
        rewardAmount = _rewardAmount;
    }

    /// @dev Register a user's verification and transfer a reward.
    /// @param nullifierSeed: Nullifier Seed used while generating the proof.
    /// @param nullifier: Nullifier for the user's Aadhaar data.
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @param signal: Signal used while generating the proof, should be equal to msg.sender.
    /// @param revealArray: Array of the values used as input for the proof generation.
    /// @param groth16Proof: SNARK Groth16 proof.
    function verifyAndReward(
        uint nullifierSeed,
        uint nullifier,
        uint timestamp,
        uint signal,
        uint[4] memory revealArray,
        uint[8] memory groth16Proof
    ) public {
        require(
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed,
                nullifier,
                timestamp,
                signal,
                revealArray,
                groth16Proof
            ) == true,
            '[AnonAadhaarReward]: Proof is not valid.'
        );

        payable(msg.sender).transfer(rewardAmount);

        emit UserVerifiedAndRewarded(msg.sender, rewardAmount);
    }

    function setRewardAmount(uint256 _rewardAmount) public {
        rewardAmount = _rewardAmount;
    }

    receive() external payable {}
}
