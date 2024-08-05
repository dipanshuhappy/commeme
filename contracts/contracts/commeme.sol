//SPDX-License-Identifier: MIT

// import "../../helperContracts/erc20.sol";
import "../../helperContracts/ierc20_permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../helperContracts/safemath.sol";

pragma solidity ^0.8.7;

contract Commeme {

    mapping(address => uint256) public donatorsAmountToKeepAlive;
    address[] public donatorsToKeepAlive;
    address[] public earlyDonators;
    mapping(address => uint256) public earlyDonatorsAmount;
    uint256 public earlyDonationAmount;
    mapping(address => bool) public isEarlyDonar;
    uint256 private minAmountToKeepAlive;
    bool public isActive;
    uint256 public timeToClose;
    uint256 public threshold;

    using SafeMath for uint256;

    error AETS();

    AggregatorV3Interface public immutable ethPriceAggregator;


    struct MemeDetails {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 availableSupply;
        address owner;
    }

    MemeDetails public memeDetails;

    modifier _SupplyEnded(uint256 _buyAmount) {
        if(memeDetails.totalSupply < _buyAmount) revert AETS();
        _;
    }

    constructor(address _sender, string memory _name, string memory _symbol, uint256 _totalSupply, uint256 _threshold) {
        MemeDetails(_name, _symbol, _totalSupply, _totalSupply, _sender);
        timeToClose = block.timestamp + 1440 minutes;
        threshold = _threshold;
        minAmountToKeepAlive = 100000000000;
        isActive = true;
    }

    function donateToKeepAlive(uint256 _amount) public {
        if(timeToClose < block.timestamp) revert("not active");
        if(_amount < minAmountToKeepAlive) revert("add more to keep alive");
        timeToClose = timeToClose.add(1440 minutes);
    }

    function earlyDonations() public payable {
        if(earlyDonationAmount >= threshold) revert("ATR"); // ATR - Already Threshold Reaches
        uint256 _amount = msg.value;
        if(!isEarlyDonar[msg.sender]) {
            earlyDonators.push(msg.sender);
            isEarlyDonar[msg.sender] = true;
            earlyDonatorsAmount[msg.sender] = earlyDonatorsAmount[msg.sender].add(_amount);
            earlyDonationAmount = earlyDonationAmount.add(_amount);
        } else {
            earlyDonationAmount = earlyDonationAmount.add(_amount);
        }
    }

    function refundIfNotActive() public {
        if(isActive) revert("its still active");
        for(uint256 i=0; i<earlyDonators.length; i++) {
            uint256 transferable_amount = earlyDonatorsAmount[earlyDonators[i]];
            earlyDonatorsAmount[earlyDonators[i]] = 0;
            payable(earlyDonators[i]).transfer(transferable_amount);
        }
    } 

    receive() external payable {
        earlyDonations();
    }
}