"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  name: string
  type: string
  location: string
  targetFunding: number
  currentFunding: number
  expectedROI: number
  expectedIRR: number
  minInvestment: number
  description: string
  image: string
  status: string
  startDate?: string
  deadline?: string
  initialInvestment: number
  payoutsReceived: number
  claimable: number
  currentROI: number
  currentIRR: number
  tokenNumber: number
  takenValue: number
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Users, Calendar, Euro, Wallet, Gift, BarChart3, Clock, Hash, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"
import MetricCard from "./metric-card"

// Mock project data
const initialProjects = [
  {
    id: 1,
    name: "Elite Padel Club Lima",
    type: "Padel Courts",
    location: "Lima, Peru",
    targetFunding: 150000,
    currentFunding: 150000,
    expectedROI: 30,
    expectedIRR:25,
    minInvestment: 500,
    description: "Premium padel facility with 6 courts in central Lima",
    image: "/modern-padel-courts-facility.png",
    status: "Active",
    startDate: "2025-01-01",
    initialInvestment: 2500,
    payoutsReceived: 0,
    claimable: 1458,
    currentROI:-41.66,
    currentIRR: 31.25,
    tokenNumber: 25,
    takenValue: 100
  },
  {
    id: 2,
    name: "Buenos Aires Tennis Academy",
    type: "Tennis Courts",
    location: "Buenos Aires, Argentina",
    targetFunding: 200000,
    currentFunding: 156000,
    expectedROI: 15.2,
    expectedIRR: 15,
    minInvestment: 750,
    deadline: "45 days left",
    description: "Professional tennis training center with 8 clay courts",
    image: "/professional-tennis-courts-academy.png",
    status: "Active",
    initialInvestment: 3000,
    payoutsReceived: 228.00,
    claimable: 0,
    currentROI: 15.2,
    currentIRR: 0,
    tokenNumber: 30,
    takenValue: 100
  },
  {
    id: 8,
    name: "Buenos Aires Sports Complex",
    type: "Multisport Club",
    location: "Buenos Aires, Argentina",
    targetFunding: 280000,
    currentFunding: 168000,
    expectedROI: 19.2,
    expectedIRR:25,
    minInvestment: 900,
    deadline: "35 days left",
    description: "Comprehensive sports facility with multiple disciplines",
    image: "/comprehensive-sports-complex-multiple-disciplines.png",
    status: "Funding",
    initialInvestment: 1800,
    payoutsReceived: 0,
    claimable: 0,
    currentROI: 0,
    currentIRR: 0,
    tokenNumber: 18,
    takenValue: 100
  },
]

// Mock transaction history
const initialTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    project: "Elite Padel Club Lima",
    action: "Invest",
    amount: 2500,
    txHash: "0x7a8b9c...",
    type: "invest"
  },
  {
    id: 2,
    date: "2024-01-20",
    project: "Buenos Aires Tennis Academy",
    action: "Invest",
    amount: 3000,
    txHash: "0x1d2e3f...",
    type: "invest"
  },
  {
    id: 3,
    date: "2024-02-01",
    project: "Buenos Aires Sports Complex",
    action: "Invest",
    amount: 1800,
    txHash: "0x4g5h6i...",
    type: "invest"
  },
  {
    id: 4,
    date: "2024-02-15",
    project: "Elite Padel Club Lima",
    action: "Claim",
    amount: 187.50,
    txHash: "0x7j8k9l...",
    type: "claim"
  },
  {
    id: 5,
    date: "2024-02-20",
    project: "Buenos Aires Tennis Academy",
    action: "Claim",
    amount: 1228.00,
    txHash: "0x1m2n3o...",
    type: "claim"
  },
]

// Mock portfolio data for chart
const portfolioData = [
  { date: "Jan 15", value: 2500 },
  { date: "Jan 20", value: 5500 },
  { date: "Feb 01", value: 7300 },
  { date: "Feb 15", value: 7487.50 },
  { date: "Feb 20", value: 7715.50 },
  { date: "Mar 01", value: 7950.00 },
  { date: "Mar 15", value: 8150.00 },
]

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [claimedAmount, setClaimedAmount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until component is mounted on client
  if (!mounted) {
    return null
  }

  // Calculate dashboard metrics
  const totalInvested = projects.reduce((sum, project) => sum + project.initialInvestment, 0)
  const totalPayouts = projects.reduce((sum, project) => sum + project.payoutsReceived, 0)
  const currentValue = totalInvested + totalPayouts
  const claimableBalance = projects.reduce((sum, project) => sum + project.claimable, 0)
  const totalRealROI = ((totalPayouts - totalInvested)*100 / totalInvested).toFixed(2)

  const handleClaimClick = (project: Project) => {
    setSelectedProject(project)
    setShowClaimModal(true)
  }

  const handleClaimConfirm = async () => {
    if (!selectedProject) return
    
    setIsClaiming(true)
    
    try {
      // Simulate claim processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the project data
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            claimable: 0,
            payoutsReceived: project.payoutsReceived + project.claimable
          }
        }
        return project
      })
      
             // Add new transaction
       const newTransaction = {
         id: transactions.length + 1,
         date: new Date().toISOString().split('T')[0],
         project: selectedProject.name,
         action: "Claim",
         amount: selectedProject.claimable,
         txHash: `0x${Date.now().toString(16)}${selectedProject.id.toString(16)}...`,
         type: "claim"
       }
      
      setProjects(updatedProjects)
      setTransactions([newTransaction, ...transactions])
      
      // Set success state and claimed amount
      setClaimedAmount(selectedProject.claimable)
      setClaimSuccess(true)
      
    } catch (error) {
      console.error('Claim failed:', error)
      alert('Claim failed. Please try again.')
    } finally {
      setIsClaiming(false)
    }
  }

  const handleClaimCancel = () => {
    setShowClaimModal(false)
    setSelectedProject(null)
    setClaimSuccess(false)
    setClaimedAmount(0)
  }

  const handleCloseModal = () => {
    setShowClaimModal(false)
    setSelectedProject(null)
    setClaimSuccess(false)
    setClaimedAmount(0)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
       
        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Invested"
            value={`$${totalInvested.toLocaleString()}`}
            description={`Across ${projects.length} projects`}
            icon={DollarSign}
          />
          
          <MetricCard
            title="Return on Investment"
            value={`${totalRealROI.toLocaleString()} %`}
            description={`Across ${projects.length} projects`}
            icon={BarChart3}
          />
          
          <MetricCard
            title="Payouts Received"
            value={`$${totalPayouts.toLocaleString()}`}
            description="Total returns to date"
            icon={Gift}
          />
          
          <MetricCard
            title="Claimable Balance"
            value={`$${claimableBalance.toLocaleString()}`}
            description="Available to claim"
            icon={Wallet}
          />
        </div>
        
       
        {/* Projects Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>           
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Investment</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Tokens</th>                    
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">IRR</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Claimable</th> 
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Payouts Received</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>                   
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-foreground">{project.name}</div>
                            <div className="text-sm text-muted-foreground">{project.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="font-medium text-foreground">${project.initialInvestment.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge 
                          variant={project.status === 'Active' ? 'default' : project.status === 'Funding' ? 'secondary' : 'outline'}
                          className="capitalize"
                        >
                          {project.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="font-medium text-foreground">{project.tokenNumber}</div>
                      </td>

                                           
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center text-green-600 text-right">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="font-medium">{project.expectedIRR}%</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="font-medium text-foreground">${project.claimable.toLocaleString()}</div>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="font-medium text-foreground">${project.payoutsReceived.toLocaleString()}</div>
                      </td>
                     
                      <td className="py-4 px-4">
                        <Button variant="outline" onClick={() => handleClaimClick(project)} disabled={isClaiming}>
                          {isClaiming ? 'Claiming...' : 'Claim'}
                        </Button>
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All your investment and claim transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {tx.date}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-foreground">{tx.project}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={tx.type === 'invest' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {tx.action}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`flex items-center font-medium ${
                          tx.type === 'invest' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {tx.type === 'invest' ? (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          )}
                                                     ${tx.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Hash className="h-4 w-4 mr-2" />
                          <span className="font-mono">{tx.txHash}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Button className="mb-8 mt-8">Simulate Time Skip</Button>
      </div>

             {/* Claim Confirmation Modal */}
       {showClaimModal && selectedProject && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <Card className="w-full max-w-md p-6">
             {!claimSuccess ? (
               <>
                 <CardHeader>
                   <CardTitle>Confirm Claim</CardTitle>
                   <CardDescription>
                     You are about to claim {selectedProject.name}. This action cannot be undone.
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p>Amount to claim: <strong>${selectedProject.claimable.toLocaleString()}</strong></p>
                   <p>Current Payouts Received: <strong>${totalPayouts.toLocaleString()}</strong></p>
                   <p>New Payouts Received: <strong>${(totalPayouts + selectedProject.claimable).toLocaleString()}</strong></p>
                   <p>Current Claimable Balance: <strong>${claimableBalance.toLocaleString()}</strong></p>
                   <p>New Claimable Balance: <strong>$0</strong></p>
                 </CardContent>
                 <CardFooter className="flex justify-end space-x-2">
                   <Button variant="outline" onClick={handleClaimCancel} disabled={isClaiming}>
                     Cancel
                   </Button>
                   <Button onClick={handleClaimConfirm} disabled={isClaiming}>
                     {isClaiming ? 'Claiming...' : 'Confirm Claim'}
                   </Button>
                 </CardFooter>
               </>
             ) : (
               <>
                 <CardHeader>
                   <CardTitle className="text-green-600 flex items-center gap-2">
                     <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                     Claim Successful!
                   </CardTitle>
                   <CardDescription>
                     Your claim has been processed successfully
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="text-center space-y-4">
                   <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                     <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                       ${claimedAmount.toLocaleString()}
                     </p>
                     <p className="text-sm text-green-600 dark:text-green-400">
                       Successfully claimed from {selectedProject.name}
                     </p>
                   </div>
                   <div className="text-sm text-muted-foreground">
                     <p>Transaction has been added to your history</p>
                     <p>Your portfolio has been updated</p>
                   </div>
                 </CardContent>
                 <CardFooter className="flex justify-center">
                   <Button onClick={handleCloseModal} className="w-full">
                     Close
                   </Button>
                 </CardFooter>
               </>
             )}
           </Card>
         </div>
       )}
    </div>
  )
}
