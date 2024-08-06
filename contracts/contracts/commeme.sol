//SPDX-License-Identifier: MIT

// import "../../helperContracts/erc20.sol";
import "../../helperContracts/ierc20_permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../helperContracts/safemath.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";

pragma solidity ^0.8.19;

interface Pool {
    function createPool(address tokenA, address tokenB, uint24 fee) external returns(address);
}

contract Commeme {
    address[] public donators;
    mapping(address => uint256) public donatorsAmount;
    uint256 public donationAmount;
    mapping(address => bool) public isDonator;
    uint256 private minAmountToKeepAlive;
    bool public isActive;
    uint256 public timeToClose;
    uint256 public threshold;
    bool public poolCreated;
    mapping(uint256 => int24) public feeAmountTickSpacing;
    mapping(address => mapping(address => mapping(uint24 => address))) public getPool;

    using SafeMath for uint256;

    error AETS();    
    IUniswapV3Factory public uniswapV3Factory;
    ISwapRouter public uniswapRouter;

    struct MemeDetails {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 circulatingSupply;
        uint256 availableSupply;
        address owner;
    }

    MemeDetails public memeDetails;

    modifier _SupplyEnded(uint256 _buyAmount) {
        if(memeDetails.totalSupply < _buyAmount) revert AETS();
        _;
    }

    constructor(
        address _sender, 
        string memory _name, 
        string memory _symbol, 
        uint256 _totalSupply, 
        uint256 _threshold
    ) {
        memeDetails = MemeDetails({
            name: _name,
            symbol: _symbol,
            totalSupply: _totalSupply,
            circulatingSupply: 0,
            availableSupply: _totalSupply,
            owner: _sender
        });
        timeToClose = block.timestamp + 1440 minutes;
        threshold = _threshold;
        minAmountToKeepAlive = 100000000000;
        feeAmountTickSpacing[10000] = 200;
        isActive = true;
    }

    function earlyDonations() public payable {
        if(donationAmount >= threshold) revert("ATR"); // ATR - Already Threshold Reaches
        if(donationAmount < threshold && block.timestamp >= timeToClose) {
            _refundIfNotActive();
        } else {
            uint256 _amount = msg.value;
            if(!isDonator[msg.sender]) {
                donators.push(msg.sender);
                isDonator[msg.sender] = true;
                donatorsAmount[msg.sender] = donatorsAmount[msg.sender].add(_amount);
                donationAmount = donationAmount.add(_amount);
            } else {
                donatorsAmount[msg.sender] = donatorsAmount[msg.sender].add(_amount);
                donationAmount = donationAmount.add(_amount);
            }
            timeToClose = timeToClose.add(60 minutes);
        }
    }

    function _createPool(address tokenA, address tokenB, uint24 fee, address _factory) public returns(address){
        require(tokenA != tokenB, "Cannot create a pool with the same token");
        Pool pool = Pool(_factory);
        address poolAddress = pool.createPool(tokenA, tokenB, fee);
        return poolAddress;
    }


    function _refundIfNotActive() private {
        if(isActive) revert("it's still active");
        for(uint256 i=0; i<donators.length; i++) {
            uint256 transferable_amount = donatorsAmount[donators[i]];
            donatorsAmount[donators[i]] = 0;
            payable(donators[i]).transfer(transferable_amount);
        }
    } 

    receive() external payable {
        earlyDonations();
    }
}
