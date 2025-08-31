"use client"

import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ExternalLink, User, Plus, Globe, Wallet } from 'lucide-react'

export const EnsProfile = () => {
  const { address } = useAccount()
  const { data: name, isLoading: nameLoading } = useEnsName({ 
    address, 
    chainId: 1,
    query: {
      enabled: !!address
    }
  })
  const { data: avatar, isLoading: avatarLoading } = useEnsAvatar({ 
    name: name || undefined, 
    chainId: 1,
    query: {
      enabled: !!name
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [desiredName, setDesiredName] = useState('')

  if (!address) return null

  const displayName = nameLoading ? 'Loading...' : (name || `${address.slice(0, 6)}...${address.slice(-4)}`)
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`
  const hasEnsName = !!name && !nameLoading

  const handleRegisterClick = () => {
    // Open ENS app for registration
    const ensUrl = desiredName 
      ? `https://app.ens.domains/register/${desiredName}`
      : 'https://app.ens.domains/'
    window.open(ensUrl, '_blank')
    setIsModalOpen(false)
  }

  const handleEnsAppClick = () => {
    // Open ENS app to manage existing name or register new one
    if (hasEnsName) {
      window.open(`https://app.ens.domains/name/${name}`, '_blank')
    } else {
      window.open('https://app.ens.domains/', '_blank')
    }
    setIsModalOpen(false)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and hyphens
    const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setDesiredName(sanitized)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      {avatarLoading ? (
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      ) : avatar ? (
        <img 
          src={avatar} 
          alt="ENS Avatar"
          className="h-8 w-8 rounded-full object-cover border border-border"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border">
          <span className="text-xs font-semibold text-primary">
            {name ? name.charAt(0).toUpperCase() : address.slice(2, 4).toUpperCase()}
          </span>
        </div>
      )}
      
      {/* Hidden fallback avatar */}
      <div 
        className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border" 
        style={{ display: 'none' }}
      >
        <span className="text-xs font-semibold text-primary">
          {name ? name.charAt(0).toUpperCase() : address.slice(2, 4).toUpperCase()}
        </span>
      </div>
      
      {/* Profile Info */}
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-foreground max-w-[120px] truncate">
          {displayName}
        </span>
        <span className="text-muted-foreground text-sm">
          {shortAddress}
        </span>
      </div>

      {/* ENS Actions */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-primary/10"
            title={hasEnsName ? "Manage ENS" : "Get ENS Name"}
          >
            {hasEnsName ? <User className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {hasEnsName ? "Manage Your ENS" : "Get Your ENS Name"}
            </DialogTitle>
            <DialogDescription>
              {hasEnsName 
                ? "Manage your existing ENS name and records"
                : "Register a unique ENS name to replace your wallet address with something memorable"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {hasEnsName ? (
              // User already has ENS
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-primary">{name}</span>
                  </CardTitle>
                  <CardDescription>
                    Your current ENS name
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Wallet className="h-3 w-3" />
                      Address:
                    </span>
                    <span className="font-mono">{shortAddress}</span>
                  </div>
                  <Button 
                    onClick={handleEnsAppClick}
                    className="w-full"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage on ENS App
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // User doesn't have ENS
              <>
                <div className="space-y-2">
                  <Label htmlFor="ens-name">Choose your ENS name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ens-name"
                      placeholder="yourname"
                      value={desiredName}
                      onChange={handleNameChange}
                      className="flex-1"
                      maxLength={63}
                    />
                    <span className="flex items-center text-muted-foreground font-mono">.eth</span>
                  </div>
                  {desiredName && (
                    <p className="text-sm text-muted-foreground">
                      You'll register: <span className="font-mono text-primary">{desiredName}.eth</span>
                    </p>
                  )}
                  {desiredName.length > 0 && desiredName.length < 3 && (
                    <p className="text-xs text-destructive">
                      Name must be at least 3 characters long
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    Benefits of ENS:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Replace your long wallet address with a simple name
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Set profile info, avatar, and social links
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Use across all dApps and wallets
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Own your Web3 identity
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleRegisterClick}
                    disabled={!desiredName || desiredName.length < 3}
                    className="flex-1 btn-primary-filled"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {desiredName ? 'Register Name' : 'Browse ENS'}
                  </Button>
                  <Button 
                    onClick={handleEnsAppClick}
                    variant="outline"
                    className="btn-secondary-outline"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    ENS App
                  </Button>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Registration fees: ~$5-20/year (depends on name length)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fees are paid directly to ENS, not SportChain
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}