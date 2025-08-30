"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { useRouter } from 'next/navigation' 
export default function NavBar() {
    
  const router = useRouter()
  
  return (
    <>
    {/* Header */}
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">S</span>
        </div>
        <span className="text-xl font-bold text-foreground">SportChain</span>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
          Projects
        </a>
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
        <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
          How It Works
        </a>
      </nav>

      <ConnectButton />
    </div>
  </header>
  </>
  )
}
