"use client"

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Building2, 
  Car,
  Lightbulb,
  Thermometer,
  BarChart3,
  ArrowLeft
} from "lucide-react"
import { getProjectBySlug, calculateFundingProgress, formatCurrency, formatPercentage } from '@/lib/utils/projects'
import Link from 'next/link'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [isInvesting, setIsInvesting] = useState(false)

  if (!project) {
    notFound()
  }

  const fundingProgress = calculateFundingProgress(project)

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsInvesting(true)
    
    try {
      // Simulate investment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically call your smart contract or API
      console.log(`Investing ${investmentAmount} in ${project.name}`)
      
      // Reset form and close modal
      setInvestmentAmount('')
      setShowInvestModal(false)
      
      // You could show a success message here
      alert('Investment submitted successfully!')
    } catch (error) {
      console.error('Investment failed:', error)
      alert('Investment failed. Please try again.')
    } finally {
      setIsInvesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-secondary/20 text-secondary">
              {project.type}
            </Badge>
            <Badge 
              variant={project.status === 'Active' ? 'default' : project.status === 'Funding' ? 'secondary' : 'outline'}
              className="capitalize"
            >
              {project.status}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{project.name}</h1>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            {project.location}
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">{project.longDescription}</p>
        </div>

        {/* Project Image and Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Key Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Target Funding</span>
                  <span className="font-semibold">{formatCurrency(project.targetFunding)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Funding</span>
                  <span className="font-semibold">{formatCurrency(project.currentFunding)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-semibold">{formatCurrency(project.minInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expected ROI</span>
                  <span className="font-semibold text-green-600">{formatPercentage(project.expectedROI)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expected IRR</span>
                  <span className="font-semibold text-green-600">{formatPercentage(project.expectedIRR)}</span>
                </div>
              </CardContent>
            </Card>

            {project.status === 'Funding' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funding Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(fundingProgress)}%</span>
                    </div>
                    <Progress value={fundingProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(project.currentFunding)}</span>
                      <span>{formatCurrency(project.targetFunding)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Invest Now button opens a modal */}
            <Button
              size="lg"
              className="btn-primary-filled flex w-full items-center gap-2"
              onClick={() => setShowInvestModal(true)}
            >
              Invest Now
            </Button>
            
            {showInvestModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-background rounded-lg shadow-lg p-8 max-w-md w-full relative">
                  <button
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowInvestModal(false)}
                    aria-label="Close"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold mb-4">Invest in {project.name}</h2>
                  {/* Simple investment form */}
                  <form
                    onSubmit={handleInvest}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="investmentAmount">
                        Amount to Invest
                      </label>
                      <input
                        id="investmentAmount"
                        name="investmentAmount"
                        type="number"
                        min={project.minInvestment}
                        step="100"
                        required
                        className="w-full border rounded px-3 py-2 bg-background text-foreground"
                        value={investmentAmount}
                        onChange={e => setInvestmentAmount(e.target.value)}
                        placeholder={`Min: ${formatCurrency(project.minInvestment)}`}
                      />
                    </div>
                    <a
                      type="submit"
                      href='/dashboard'
                      className="btn-primary-filled w-full"
                      
                      onClick={() => setShowInvestModal(false)}
                    >
                      Confirm Investment
                    </a>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Facility Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Facility Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.facilityDetails.courts && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courts</span>
                  <span className="font-medium">{project.facilityDetails.courts}</span>
                </div>
              )}
              {project.facilityDetails.fields && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fields</span>
                  <span className="font-medium">{project.facilityDetails.fields}</span>
                </div>
              )}
              {project.facilityDetails.tennisCourts && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tennis Courts</span>
                  <span className="font-medium">{project.facilityDetails.tennisCourts}</span>
                </div>
              )}
              {project.facilityDetails.padelCourts && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Padel Courts</span>
                  <span className="font-medium">{project.facilityDetails.padelCourts}</span>
                </div>
              )}
              {project.facilityDetails.soccerFields && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Soccer Fields</span>
                  <span className="font-medium">{project.facilityDetails.soccerFields}</span>
                </div>
              )}
              {project.facilityDetails.basketballCourts && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Basketball Courts</span>
                  <span className="font-medium">{project.facilityDetails.basketballCourts}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Surface Type</span>
                <span className="font-medium">{project.facilityDetails.surfaceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lighting</span>
                <span className="font-medium">{project.facilityDetails.lighting}</span>
              </div>
              {project.facilityDetails.climateControl !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Climate Control</span>
                  <span className="font-medium">{project.facilityDetails.climateControl ? 'Yes' : 'No'}</span>
                </div>
              )}
              {project.facilityDetails.seatingCapacity && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seating Capacity</span>
                  <span className="font-medium">{project.facilityDetails.seatingCapacity.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parking Spaces</span>
                <span className="font-medium">{project.facilityDetails.parkingSpaces}</span>
              </div>
            </CardContent>
          </Card>

          {/* Financial Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Financial Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.financialMetrics.monthlyRevenue ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Revenue</span>
                    <span className="font-medium">{formatCurrency(project.financialMetrics.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Operating Costs</span>
                    <span className="font-medium">{formatCurrency(project.financialMetrics.operatingCosts!)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Profit</span>
                    <span className="font-medium text-green-600">{formatCurrency(project.financialMetrics.netProfit!)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Debt to Equity</span>
                    <span className="font-medium">{project.financialMetrics.debtToEquity}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Monthly Revenue</span>
                    <span className="font-medium">{formatCurrency(project.financialMetrics.projectedMonthlyRevenue!)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Operating Costs</span>
                    <span className="font-medium">{formatCurrency(project.financialMetrics.projectedOperatingCosts!)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Net Profit</span>
                    <span className="font-medium text-green-600">{formatCurrency(project.financialMetrics.projectedNetProfit!)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Debt to Equity</span>
                    <span className="font-medium">{project.financialMetrics.projectedDebtToEquity}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${project.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investment CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Invest?</CardTitle>
            <CardDescription>
              Join the future of sports infrastructure investment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-primary-filled"
                onClick={() => setShowInvestModal(true)}
              >
                Invest Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
