// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Meme is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply,
        address owner
    ) ERC20(name_, symbol_) {
        _mint(owner, initialSupply * 10 ** uint256(decimals_));
    }
}
