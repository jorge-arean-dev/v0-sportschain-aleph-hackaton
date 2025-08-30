import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Users, Calendar } from "lucide-react"

// Mock project data
const projects = [
  {
    id: 1,
    name: "Elite Padel Club Lima",
    type: "Padel Courts",
    location: "Lima, Peru",
    targetFunding: 150000,
    currentFunding: 127500,
    expectedROI: 12.5,
    minInvestment: 500,
    deadline: "30 days left",
    description: "Premium padel facility with 6 courts in central Lima",
    image: "/modern-padel-courts-facility.png",
  },
  {
    id: 2,
    name: "Buenos Aires Tennis Academy",
    type: "Tennis Courts",
    location: "Buenos Aires, Argentina",
    targetFunding: 200000,
    currentFunding: 156000,
    expectedROI: 15.2,
    minInvestment: 750,
    deadline: "45 days left",
    description: "Professional tennis training center with 8 clay courts",
    image: "/professional-tennis-courts-academy.png",
  },
  {
    id: 3,
    name: "Montevideo Soccer Complex",
    type: "Soccer Fields",
    location: "Montevideo, Uruguay",
    targetFunding: 300000,
    currentFunding: 195000,
    expectedROI: 18.7,
    minInvestment: 1000,
    deadline: "22 days left",
    description: "Multi-purpose soccer facility with 3 full-size pitches",
    image: "/modern-soccer-football-complex-fields.png",
  },
  {
    id: 4,
    name: "Bogota Multisport Hub",
    type: "Multisport Club",
    location: "Bogota, Colombia",
    targetFunding: 250000,
    currentFunding: 187500,
    expectedROI: 16.8,
    minInvestment: 800,
    deadline: "38 days left",
    description: "Complete sports complex with tennis, padel, and fitness",
    image: "/multisport-complex-facility-modern.png",
  },
  {
    id: 5,
    name: "Quito Padel Center",
    type: "Padel Courts",
    location: "Quito, Ecuador",
    targetFunding: 120000,
    currentFunding: 84000,
    expectedROI: 14.3,
    minInvestment: 400,
    deadline: "52 days left",
    description: "Indoor padel facility with 4 premium courts",
    image: "/indoor-padel-courts-center-modern.png",
  },
  {
    id: 6,
    name: "Mexico DF Tennis Resort",
    type: "Tennis Courts",
    location: "Mexico DF, Mexico",
    targetFunding: 180000,
    currentFunding: 108000,
    expectedROI: 13.9,
    minInvestment: 600,
    deadline: "41 days left",
    description: "Luxury tennis resort with 6 courts and clubhouse",
    image: "/luxury-tennis-resort-courts-clubhouse.png",
  },
  {
    id: 7,
    name: "Lima Soccer Academy",
    type: "Soccer Fields",
    location: "Lima, Peru",
    targetFunding: 220000,
    currentFunding: 154000,
    expectedROI: 17.1,
    minInvestment: 700,
    deadline: "29 days left",
    description: "Youth soccer training facility with 2 regulation fields",
    image: "/youth-soccer-academy-training-fields.png",
  },
  {
    id: 8,
    name: "Buenos Aires Sports Complex",
    type: "Multisport Club",
    location: "Buenos Aires, Argentina",
    targetFunding: 280000,
    currentFunding: 168000,
    expectedROI: 19.2,
    minInvestment: 900,
    deadline: "35 days left",
    description: "Comprehensive sports facility with multiple disciplines",
    image: "/comprehensive-sports-complex-multiple-disciplines.png",
  },
]

export default function SportChainLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">SportChain</span>
          </div>
          

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 shadow-sm">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <span className="font-mono text-base md:text-lg font-semibold text-primary">
                sportchain.eth
              </span>
              <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">
                Connected
              </span>
            </div>
            <a className="btn-primary-filled flex items-center gap-2" href="/dashboard">
              Dashboard
            </a>
          </div>

        </div>
      </header>

     

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
              const fundingProgress = (project.currentFunding / project.targetFunding) * 100

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
                          {(() => {
                            const [city, country] = project.location.split(",").map(s => s.trim());
                            return (
                              <>
                                <span className="font-semibold">{city}</span>
                                <span className="mx-1 text-muted-foreground">|</span>
                                <span>{country}</span>
                              </>
                            );
                          })()}
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
                        <span>€{project.currentFunding.toLocaleString()}</span>
                        <span>€{project.targetFunding.toLocaleString()}</span>
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
                          <div className="font-semibold">€{project.minInvestment}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.deadline}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="flex gap-2 w-full">
                      <Button className="flex-1 btn-primary-outline">Details</Button>
                      <Button className="flex-1 btn-primary-filled">Invest</Button>
                    </div>
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
  )
}
