// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./Commeme.sol";

contract CommemeFactory {
    address[] public allCommemes;

    event CommemeCreated(address indexed commemeAddress, address indexed creator);

    function createCommeme(
        address _sender,
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _threshold,
        address _factoryContractAddress,
        address _router,
        address _wCoreAddress
    ) external returns (address) {
        Commeme newCommeme = new Commeme(
            _sender,
            _name,
            _symbol,
            _totalSupply,
            _threshold,
            _factoryContractAddress,
            _router,
            _wCoreAddress
        );

        allCommemes.push(address(newCommeme));
        emit CommemeCreated(address(newCommeme), msg.sender);
        return address(newCommeme);
    }

    function getAllCommemes() external view returns (address[] memory) {
        return allCommemes;
    }
}
