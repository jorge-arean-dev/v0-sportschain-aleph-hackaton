"use client";

import { useState, useCallback } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther, Address } from "viem";
import SportsChainABI from "@/lib/abis/SportsChain.json";
import SportsTokenABI from "@/lib/abis/SportsToken.json";

// Contract addresses - these should be set based on your deployment
const SPORTS_CHAIN_ADDRESS = process.env.NEXT_PUBLIC_SPORTS_CHAIN_ADDRESS as Address;

// Types
interface ContractResponse {
  data?: string;
  error?: string;
  loading: boolean;
  hash?: string;
}

interface SportsTokenData {
  name: string;
  symbol: string;
  initialUri: string;
  unitPrice: bigint;
  totalInvested: bigint;
  totalSold: bigint;
  supply: bigint;
  saleStatus: number; // 0: NotStarted, 1: Active, 2: Completed
}

interface UseContractReturn {
  // SportsChain functions
  deploySportsToken: (params: DeploySportsTokenParams) => Promise<void>;
  addToWhitelist: () => Promise<void>;
  removeFromWhitelist: () => Promise<void>;
  isWhitelisted: (address: Address) => any;
  getSportsTokens: () => any;
  
  // SportsToken functions
  investInToken: (tokenAddress: Address, amount: string) => Promise<void>;
  pauseToken: (tokenAddress: Address) => Promise<void>;
  unpauseToken: (tokenAddress: Address) => Promise<void>;
  getTokenData: (tokenAddress: Address) => any;
  getTokenBalance: (tokenAddress: Address, userAddress?: Address) => any;
  
  // State management
  deployToken: ContractResponse;
  whitelistAction: ContractResponse;
  investment: ContractResponse;
  tokenManagement: ContractResponse;
}

interface DeploySportsTokenParams {
  unitPrice: string;
  supply: string;
  receiver: Address;
  name: string;
  symbol: string;
  initialUri: string;
}

export function useContract(): UseContractReturn {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  
  // State management for different operations
  const [deployToken, setDeployToken] = useState<ContractResponse>({ loading: false });
  const [whitelistAction, setWhitelistAction] = useState<ContractResponse>({ loading: false });
  const [investment, setInvestment] = useState<ContractResponse>({ loading: false });
  const [tokenManagement, setTokenManagement] = useState<ContractResponse>({ loading: false });

  // SportsChain Functions
  const deploySportsToken = useCallback(async (params: DeploySportsTokenParams) => {
    if (!SPORTS_CHAIN_ADDRESS) {
      throw new Error("SportsChain contract address not configured");
    }
    
    setDeployToken({ loading: true });
    
    try {
      const result = writeContract({
        address: SPORTS_CHAIN_ADDRESS,
        abi: SportsChainABI.abi,
        functionName: "deploySportsToken",
        args: [
          parseEther(params.unitPrice),
          BigInt(params.supply),
          params.receiver,
          params.name,
          params.symbol,
          params.initialUri,
        ],
      });
      
      setDeployToken({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Deploy failed";
      setDeployToken({
        error: errorMessage,
        loading: false,
      });
      console.error("Deploy sports token error:", error);
      throw error;
    }
  }, [writeContract]);

  const addToWhitelist = useCallback(async () => {
    if (!SPORTS_CHAIN_ADDRESS) {
      throw new Error("SportsChain contract address not configured");
    }
    
    setWhitelistAction({ loading: true });
    
    try {
      writeContract({
        address: SPORTS_CHAIN_ADDRESS,
        abi: SportsChainABI.abi,
        functionName: "addToWhitelist",
      });
      
      setWhitelistAction({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Whitelist action failed";
      setWhitelistAction({
        error: errorMessage,
        loading: false,
      });
      console.error("Add to whitelist error:", error);
      throw error;
    }
  }, [writeContract]);

  const removeFromWhitelist = useCallback(async () => {
    if (!SPORTS_CHAIN_ADDRESS) {
      throw new Error("SportsChain contract address not configured");
    }
    
    setWhitelistAction({ loading: true });
    
    try {
      writeContract({
        address: SPORTS_CHAIN_ADDRESS,
        abi: SportsChainABI.abi,
        functionName: "removeFromWhitelist",
      });
      
      setWhitelistAction({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Whitelist action failed";
      setWhitelistAction({
        error: errorMessage,
        loading: false,
      });
      console.error("Remove from whitelist error:", error);
      throw error;
    }
  }, [writeContract]);

  // Read functions using useReadContract
  const isWhitelisted = (address: Address) => {
    return useReadContract({
      address: SPORTS_CHAIN_ADDRESS,
      abi: SportsChainABI.abi,
      functionName: "isWhitelisted",
      args: [address],
    });
  };

  const getSportsTokens = () => {
    return useReadContract({
      address: SPORTS_CHAIN_ADDRESS,
      abi: SportsChainABI.abi,
      functionName: "getSportsTokens",
      args: [0], // Get first token, you might want to iterate
    });
  };

  // SportsToken Functions
  const investInToken = useCallback(async (tokenAddress: Address, amount: string) => {
    setInvestment({ loading: true });
    
    try {
      writeContract({
        address: tokenAddress,
        abi: SportsTokenABI.abi,
        functionName: "invest",
        args: [BigInt(amount)],
      });
      
      setInvestment({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Investment failed";
      setInvestment({
        error: errorMessage,
        loading: false,
      });
      console.error("Investment error:", error);
      throw error;
    }
  }, [writeContract]);

  const pauseToken = useCallback(async (tokenAddress: Address) => {
    setTokenManagement({ loading: true });
    
    try {
      writeContract({
        address: tokenAddress,
        abi: SportsTokenABI.abi,
        functionName: "pause",
      });
      
      setTokenManagement({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Pause failed";
      setTokenManagement({
        error: errorMessage,
        loading: false,
      });
      console.error("Pause token error:", error);
      throw error;
    }
  }, [writeContract]);

  const unpauseToken = useCallback(async (tokenAddress: Address) => {
    setTokenManagement({ loading: true });
    
    try {
      writeContract({
        address: tokenAddress,
        abi: SportsTokenABI.abi,
        functionName: "unpause",
      });
      
      setTokenManagement({
        data: "Transaction initiated",
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unpause failed";
      setTokenManagement({
        error: errorMessage,
        loading: false,
      });
      console.error("Unpause token error:", error);
      throw error;
    }
  }, [writeContract]);

  const getTokenData = (tokenAddress: Address) => {
    return useReadContract({
      address: tokenAddress,
      abi: SportsTokenABI.abi,
      functionName: "getData",
    });
  };

  const getTokenBalance = (tokenAddress: Address, userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return useReadContract({
      address: tokenAddress,
      abi: SportsTokenABI.abi,
      functionName: "balanceOf",
      args: [targetAddress],
    });
  };

  return {
    // SportsChain functions
    deploySportsToken,
    addToWhitelist,
    removeFromWhitelist,
    isWhitelisted,
    getSportsTokens,
    
    // SportsToken functions
    investInToken,
    pauseToken,
    unpauseToken,
    getTokenData,
    getTokenBalance,
    
    // State management
    deployToken,
    whitelistAction,
    investment,
    tokenManagement,
  };
}

// Utility hooks for specific use cases
export function useSportsChain() {
  const {
    deploySportsToken,
    addToWhitelist,
    removeFromWhitelist,
    isWhitelisted,
    getSportsTokens,
    deployToken,
    whitelistAction,
  } = useContract();
  
  return {
    deploySportsToken,
    addToWhitelist,
    removeFromWhitelist,
    isWhitelisted,
    getSportsTokens,
    deployToken,
    whitelistAction,
  };
}

export function useSportsToken(tokenAddress: Address) {
  const {
    investInToken,
    pauseToken,
    unpauseToken,
    getTokenData,
    getTokenBalance,
    investment,
    tokenManagement,
  } = useContract();
  
  const tokenData = getTokenData(tokenAddress);
  const userBalance = getTokenBalance(tokenAddress);
  
  return {
    investInToken: (amount: string) => investInToken(tokenAddress, amount),
    pauseToken: () => pauseToken(tokenAddress),
    unpauseToken: () => unpauseToken(tokenAddress),
    tokenData,
    userBalance,
    investment,
    tokenManagement,
  };
}

// Utility functions for formatting
export const formatTokenAmount = (amount: bigint, decimals: number = 18): string => {
  return formatEther(amount);
};

export const parseTokenAmount = (amount: string): bigint => {
  return parseEther(amount);
};

// Export types for use in other components
export type { SportsTokenData, DeploySportsTokenParams, ContractResponse };
