//SPDX-License-Identifier: MIT

// import "../../helperContracts/erc20.sol";
import "../../helperContracts/ierc20_permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../helperContracts/safemath.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "./ERC20MemeToken.sol";
import "../../helperContracts/wcore_interface.sol";

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
    address private wrapCoreAddress;
    address private factoryContractAddress;
    IWCORE private _wcore;
    ISwapRouter public immutable swapRouter;
    IUniswapV3Pool public immutable wCorePool;

    // uint24 fees = wCorePool.fee();

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
        address tokenAddress;
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
        uint256 _threshold,
        address _wrapCoreAddress, 
        address _factoryContractAddress,
        address _swapRouter, 
        address _wCorePoolAddress,
        address _wCoreAddress //// 0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f
    ) {
        memeDetails = MemeDetails({
            name: _name,
            symbol: _symbol,
            totalSupply: _totalSupply,
            circulatingSupply: 0,
            availableSupply: _totalSupply,
            tokenAddress: 0x0000000000000000000000000000000000000000,
            owner: _sender
        });
        timeToClose = block.timestamp + 1440 minutes;
        threshold = _threshold;
        minAmountToKeepAlive = 100000000000;
        feeAmountTickSpacing[10000] = 200;
        wrapCoreAddress = _wrapCoreAddress;
        _wcore = IWCORE(_wCoreAddress);
        swapRouter = ISwapRouter(_swapRouter);
        wCorePool = IUniswapV3Pool(_wCorePoolAddress);
        factoryContractAddress = _factoryContractAddress;
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
            if(donationAmount >= threshold) {
                _deployToken();
                _createPool(wrapCoreAddress , memeDetails.tokenAddress, 3000, factoryContractAddress);
                _wcore.deposit{value: address(this).balance};
                ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
                    path: abi.encodePacked(address(_wcore), wCorePool.fee(), memeDetails.tokenAddress),
                    recipient: address(this),
                    deadline: block.timestamp,
                    amountIn: address(_wcore).balance,
                    amountOutMinimum: address(_wcore).balance.mul(100-5).div(100)
                });
                uint256 memeTokens = swapRouter.exactInput(params);
                _transferTokens(memeTokens);
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

    function _deployToken() private {
        require(memeDetails.tokenAddress == 0x0000000000000000000000000000000000000000, "Token already deployed");

        ERC20MemeToken token = new ERC20MemeToken(
            memeDetails.name,
            memeDetails.symbol,
            memeDetails.totalSupply
        );
        memeDetails.tokenAddress = address(token);
    }

    // function _transferTokens(uint256 _totalMemeTokens) private {
    //     for(uint i=0; i<donators.length; i++) {
            
    //     }
    // }

    receive() external payable {
        earlyDonations();
    }
}
