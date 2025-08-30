import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Users, Calendar } from "lucide-react"

import { getAllProjects, calculateFundingProgress, formatCurrency } from '@/lib/utils/projects'
import Link from 'next/link'

// Get all projects from the data source
const projects = getAllProjects()

export default function SportChainLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dnhjrpwmc/video/upload/v1756562305/input_4k_ejnqd6.mp4"
      >
        <source
          src="https://res.cloudinary.com/dnhjrpwmc/video/upload/v1756562305/input_4k_ejnqd6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="fixed inset-0 bg-background/70 z-10"></div>

      <div className="relative z-20">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
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


            <a className="btn-primary-filled flex items-center gap-2" href="/wallet_connected">
            Connect Wallet
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Invest in the Future of <span className="text-primary">Sports Infrastructure</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Tokenize and democratize sports facility ownership. Earn passive income from real-world sports
              infrastructure through blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-filled flex items-center gap-2">
                Start Investing
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button size="lg" className="btn-secondary-outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Opportunities</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover premium sports facilities ready for tokenized investment
              </p>
            </div>
            
            {/* 2x4 Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => {
                const fundingProgress = calculateFundingProgress(project)

                return (
                  <Card
                    key={project.id}
                    className="bg-card border-border/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold text-card-foreground mb-1">{project.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {project.location}
                          </div>
                        </div>
                        
                      </div>
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                          {project.type}
                        </Badge>
                      <CardDescription className="text-sm text-muted-foreground">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Funding Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Funding Progress</span>
                          <span className="text-card-foreground font-medium">{Math.round(fundingProgress)}%</span>
                        </div>
                        <Progress value={fundingProgress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{formatCurrency(project.currentFunding)}</span>
                          <span>{formatCurrency(project.targetFunding)}</span>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <div className="text-muted-foreground">Expected ROI</div>
                            <div className="font-semibold text-primary">{project.expectedROI}%</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-secondary mr-2" />
                          <div>
                            <div className="text-muted-foreground">Min. Investment</div>
                            <div className="font-semibold">{formatCurrency(project.minInvestment)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {project.deadline || 'Coming Soon'}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Link href={`/projects/${project.slug}`} className="w-full">
                        <Button className="w-full btn-primary-outline">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-4 mt-20">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SportChain</span>
            </div>
            <p className="text-muted-foreground">
              Democratizing sports infrastructure investment through blockchain technology
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
