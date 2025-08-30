// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SportsChain} from "../src/SportsChain.sol";

contract SportsChainScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        address paymentToken = address(1);
        // Deploy SportsChain with payment token
        SportsChain sportsChain = new SportsChain(address(paymentToken));

        console.log("SportsChain deployed to:", address(sportsChain));
        console.log("Payment Token deployed to:", address(paymentToken));

        vm.stopBroadcast();
    }
}
}
