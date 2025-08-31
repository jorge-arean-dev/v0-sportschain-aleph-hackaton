"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { useRouter } from 'next/navigation' 
import { useAccount } from "wagmi"
import { EnsProfile } from './EnsProfile'

export default function NavBar() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  
  // Temporary debugging - remove after testing
  console.log('NavBar - isConnected:', isConnected, 'address:', address)
  
  return (
    <>
    {/* Header */}
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
        <div className="h-8 w-8 rounded-lg flex items-center justify-center">
          <img src="/sportchain.png" alt="SportChain Logo" className="h-8 w-8 object-contain" />
        </div>
        <span className="text-xl font-bold text-foreground">SportChain</span>
      </div>
      <div className="flex items-center space-x-6">
        {isConnected && <a href="/dashboard" className="btn-primary-outline text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>}
        {isConnected && <EnsProfile />}
        <ConnectButton />
      </div>
    </div>
  </header>
  </>
  )
}
