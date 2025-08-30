import projectsData from '../data/projects.json'

export interface Project {
  id: number
  slug: string
  name: string
  type: string
  location: string
  targetFunding: number
  currentFunding: number
  expectedROI: number
  expectedIRR: number
  minInvestment: number
  description: string
  longDescription: string
  image: string
  gallery: string[]
  status: string
  startDate?: string
  deadline?: string
  initialInvestment?: number
  payoutsReceived?: number
  claimable?: number
  currentROI?: number
  currentIRR?: number
  tokenNumber?: number
  takenValue?: number
  facilityDetails: {
    courts?: number
    fields?: number
    surfaceType: string
    lighting: string
    climateControl?: boolean
    parkingSpaces: number
    seatingCapacity?: number
    trainingAreas?: number
    tennisCourts?: number
    padelCourts?: number
    soccerFields?: number
    basketballCourts?: number
    fitnessCenter?: boolean
    swimmingPool?: boolean
  }
  financialMetrics: {
    monthlyRevenue?: number
    operatingCosts?: number
    netProfit?: number
    debtToEquity?: number
    projectedMonthlyRevenue?: number
    projectedOperatingCosts?: number
    projectedNetProfit?: number
    projectedDebtToEquity?: number
  }
}

export function getAllProjects(): Project[] {
  return projectsData.projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.projects.find(project => project.slug === slug)
}

export function getProjectsByStatus(status: string): Project[] {
  return projectsData.projects.filter(project => project.status === status)
}

export function getProjectsByType(type: string): Project[] {
  return projectsData.projects.filter(project => project.type === type)
}

export function getProjectsByLocation(location: string): Project[] {
  return projectsData.projects.filter(project => 
    project.location.toLowerCase().includes(location.toLowerCase())
  )
}

export function getActiveProjects(): Project[] {
  return getProjectsByStatus('Active')
}

export function getFundingProjects(): Project[] {
  return getProjectsByStatus('Funding')
}

export function calculateFundingProgress(project: Project): number {
  return (project.currentFunding / project.targetFunding) * 100
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}
