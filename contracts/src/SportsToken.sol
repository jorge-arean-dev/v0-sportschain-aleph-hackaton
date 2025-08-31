// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {SportsChain} from "./SportsChain.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SportsToken is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ERC20Permit {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    enum SaleStatus {
        NotStarted,
        Active,
        Completed
    }

    SportsChain public sportsChain;
    IERC20 public paymentToken;

    uint256 public unitPrice;
    address public reciever;
    uint256 public totalInvested;
    uint256 public totalSold;
    uint256 public supply;
    string public initialUri;
    SaleStatus public saleStatus;
    uint256 public minimumInvestment;

    event TokenPurchased(address indexed buyer, uint256 amount, uint256 totalInvested, uint256 totalSold, uint256 supply, SaleStatus saleStatus);

    constructor(
        address defaultAdmin, 
        address pauser,
        uint256 _unit_price,
        uint256 _supply,
        uint256 _minimumInvestment,
        address _reciever,
        address _paymentToken,
        string memory _name,
        string memory _symbol,
        string memory _initial_uri
        )
        ERC20(_name, _symbol)
        ERC20Permit("MyRWA")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);

        unitPrice = _unit_price;
        reciever = _reciever;
        paymentToken = IERC20(_paymentToken);
        totalInvested = 0;
        totalSold = 0;
        supply = _supply;
        initialUri = _initial_uri;
        saleStatus = SaleStatus.Active;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function invest(uint256 amount) public whenNotPaused {
        require(amount != 0, "Invalid amount");
        require(amount >= minimumInvestment, "Investment below minimum");
        require(saleStatus == SaleStatus.Active, "Sale not active");
        require(SportsChain(sportsChain).isWhitelisted(msg.sender), "Not whitelisted");
        if(amount + totalSold > supply) {
            amount = supply - totalSold;
        }
        require(paymentToken.transferFrom(msg.sender, address(this), amount * unitPrice), "Transfer failed");

        _mint(msg.sender, amount);
        totalInvested += amount * unitPrice;
        totalSold += amount;

        if(totalSold == supply) {
            saleStatus = SaleStatus.Completed;
        }

        emit TokenPurchased(msg.sender, amount, totalInvested, totalSold, supply, saleStatus);
    }

    struct Data {
        string name;
        string symbol;
        string initialUri;
        uint256 unitPrice;
        uint256 totalInvested;
        uint256 totalSold;
        uint256 supply;
        SaleStatus saleStatus;
    }

    function getData() public view returns (Data memory) {
        Data memory data = Data(name(), symbol(), initialUri, unitPrice, totalInvested, totalSold, supply, saleStatus);
        return data;
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
