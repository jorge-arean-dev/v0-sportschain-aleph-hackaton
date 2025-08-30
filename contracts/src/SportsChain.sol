// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SportsToken} from "./SportsToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SportsChain is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant WHITELISTED = keccak256("WHITELISTED");

    IERC20 public paymentToken;

    event SportsTokenDeployed(address indexed sportsToken, uint256 unitPrice, uint256 supply, address reciever);

    event WhitelistAdded(address indexed _address);
    event WhitelistRemoved(address indexed _address);

    address[] public sportsTokens;

    constructor(address _paymentToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(WHITELISTED, msg.sender);

        paymentToken = IERC20(_paymentToken);
    }

    function deploySportsToken(
        uint256 _unitPrice,
        uint256 _supply,
        address _reciever,
        string calldata _name,
        string calldata _symbol,
        string calldata _initial_uri
    ) public onlyRole(ADMIN_ROLE) returns (address) {
        SportsToken sportsToken = new SportsToken(
            msg.sender,
            msg.sender,
            _unitPrice,
            _supply,
            _reciever,
            address(paymentToken),
            _name,
            _symbol,
            _initial_uri
        );

        sportsTokens.push(address(sportsToken));

        emit SportsTokenDeployed(address(sportsToken), _unitPrice, _supply, _reciever);
        return address(sportsToken);
    }

    function addToWhitelist() public {
        _grantRole(WHITELISTED, msg.sender);
        emit WhitelistAdded(msg.sender);
    }

    function removeFromWhitelist() public {
        _revokeRole(WHITELISTED, msg.sender);
        emit WhitelistRemoved(msg.sender);
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return hasRole(WHITELISTED, _address);
    }
   
}
