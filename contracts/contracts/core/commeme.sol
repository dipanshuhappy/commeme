//SPDX-License-Identifier: MIT

// import "../../helperContracts/erc20.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../helperContracts/ierc20_permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../helperContracts/safemath.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "./erc20Meme.sol";
import "../../helperContracts/wcore_interface.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

pragma solidity ^0.8.19;

interface Pool {
    function createPair(address tokenA, address tokenB) external returns(address);
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
    mapping(address => mapping(address => mapping(uint24 => address))) public getPool;
    address private wrapCoreAddress;
    address private factoryContractAddress;
    IWCORE private _wcore;
    ISwapRouter public immutable swapRouter;
    IUniswapV2Router02 public immutable IUniswapV2Router;
    IERC20Permit private _meme;
    address public ROUTER;

    using SafeMath for uint256;

    error AETS();    
    IUniswapV3Factory public uniswapV3Factory;
    // IUniswapV2Factory public 
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
        address _router,
        address _wCorePoolAddress,
        address _wCoreAddress
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
        wrapCoreAddress = _wrapCoreAddress;
        _wcore = IWCORE(_wCoreAddress);
        swapRouter = ISwapRouter(_swapRouter);
        ROUTER = _router;
        factoryContractAddress = _factoryContractAddress;
        isActive = true;
    }

    function earlyDonations(address _sender) public payable {
        if(donationAmount >= threshold) revert("ATR"); // ATR - Already Threshold Reaches
        if(donationAmount < threshold && block.timestamp >= timeToClose) {
            _refundIfNotActive();
        } else {
            uint256 _amount = msg.value;
            if(!isDonator[_sender]) {
                donators.push(_sender);
                isDonator[_sender] = true;
                donatorsAmount[_sender] = donatorsAmount[_sender].add(_amount);
                donationAmount = donationAmount.add(_amount);
            } else {
                donatorsAmount[_sender] = donatorsAmount[_sender].add(_amount);
                donationAmount = donationAmount.add(_amount);
            }
            if(donationAmount >= threshold) {
                _deployToken();
                _createPool(wrapCoreAddress , memeDetails.tokenAddress, factoryContractAddress);
                _meme = IERC20Permit(memeDetails.tokenAddress);
                _wcore.deposit{value: address(this).balance};
                uint256 toLiquidity =  (memeDetails.totalSupply.mul(70)).div(100);
                uint256 forAirDrop = memeDetails.totalSupply.sub(toLiquidity);
                _addLiquidity(wrapCoreAddress, memeDetails.tokenAddress, toLiquidity, donationAmount);
                _transferTokens(forAirDrop);
            }
            timeToClose = timeToClose.add(60 minutes);
        }
    }

    function _createPool(address token0, address token1, address _factory) private returns(address){
        require(token0 != token1, "Cannot create a pool with the same token");
        Pair pair = Pair(_factory);
        address pairAddress = pair.createPair(token0, token1);
        return pairAddress;
    }

    function _addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) private {

        _meme.approve(ROUTER, _amountA);
        _wcore.approve(ROUTER, _amountB);

        (uint256 amountA, uint256 amountB, uint256 liquidity) = IUniswapV2Router02(ROUTER).addLiquidity(
            _tokenA,
            _tokenB,
            _amountA,
            _amountB,
            1,
            1,
            address(this),
            block.timestamp
        );
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

    function _transferTokens(uint256 forAirDrop) private {
        for(uint i=0; i<donators.length; i++) {
            address donator = donators[i];
            uint256 donatorContribution = donatorsAmount[donator];
            uint256 donatorPercentage = donatorContribution.mul(100).div(donationAmount);
            uint256 tokensToSend = forAirDrop.mul(donatorPercentage).div(100);
            _meme.transfer(donator, tokensToSend);
        }
    }

    receive() external payable {
        earlyDonations();
    }
}
