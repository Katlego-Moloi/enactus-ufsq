"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// SDG definitions based on UN Sustainable Development Goals
export const SDG_LIST = [
  { id: 1, name: "No Poverty", color: "#E5243B" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A" },
  { id: 3, name: "Good Health", color: "#4C9F38" },
  { id: 4, name: "Quality Education", color: "#C5192D" },
  { id: 5, name: "Gender Equality", color: "#FF3A21" },
  { id: 6, name: "Clean Water", color: "#26BDE2" },
  { id: 7, name: "Clean Energy", color: "#FCC30B" },
  { id: 8, name: "Decent Work", color: "#A21942" },
  { id: 9, name: "Industry & Innovation", color: "#FD6925" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { id: 11, name: "Sustainable Cities", color: "#FD9D24" },
  { id: 12, name: "Responsible Consumption", color: "#BF8B2E" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
  { id: 14, name: "Life Below Water", color: "#0A97D9" },
  { id: 15, name: "Life on Land", color: "#56C02B" },
  { id: 16, name: "Peace & Justice", color: "#00689D" },
  { id: 17, name: "Partnerships", color: "#19486A" },
] as const

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  coverImageUrl: string
  body: string
  excerpt: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  industry: string
  slogan: string
  year: string
  description: string
  fullDescription: string
  coverImageUrl: string
  logoUrl: string
  sdgs: number[]
  projectType: "Social Enterprise" | "Community Project" | "Strategic Project"
  status: "Active" | "Completed" | "Planning"
  impactMetrics: string[]
  contactEmail: string
  contactPhone: string
  website: string
  socialLinks: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  teamLead: string
  enabled: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Sponsor {
  id: string
  name: string
  logoUrl: string
  tier: "Platinum" | "Gold" | "Silver"
  description: string
  website: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Position {
  id: string
  title: string
  department: string
  type: "Volunteer" | "Part-time"
  description: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  name: string
  email: string
  studentNumber: string
  faculty: string
  yearOfStudy: string
  positionId: string
  motivation: string
  skills: string
  reviewed: boolean
  createdAt: Date
}

interface DataContextType {
  // Articles
  articles: Article[]
  addArticle: (article: Omit<Article, "id" | "slug" | "createdAt" | "updatedAt">) => void
  updateArticle: (id: string, article: Partial<Article>) => void
  deleteArticle: (id: string) => void
  getPublishedArticles: () => Article[]
  getLatestPublishedArticles: (count: number) => Article[]
  getArticleBySlug: (slug: string) => Article | undefined
  // Projects
  projects: Project[]
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  getEnabledProjects: () => Project[]
  getLatestEnabledProjects: (count: number) => Project[]
  getProjectById: (id: string) => Project | undefined
  // Sponsors
  sponsors: Sponsor[]
  addSponsor: (sponsor: Omit<Sponsor, "id" | "createdAt" | "updatedAt">) => void
  updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void
  deleteSponsor: (id: string) => void
  getActiveSponsors: () => Sponsor[]
  // Positions
  positions: Position[]
  addPosition: (position: Omit<Position, "id" | "createdAt" | "updatedAt">) => void
  updatePosition: (id: string, position: Partial<Position>) => void
  deletePosition: (id: string) => void
  getActivePositions: () => Position[]
  // Applications
  applications: Application[]
  addApplication: (application: Omit<Application, "id" | "reviewed" | "createdAt">) => void
  markApplicationReviewed: (id: string) => void
  getApplications: () => Application[]
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "ENACTUSUFSQ IN THE NETHERLANDS",
    slug: "enactusufsq-in-the-netherlands",
    category: "Competitions",
    coverImageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home%20Page-H4keOdufoMJ6gRz5f2gg7wAWpdXKop.png",
    body: "Through the gracious efforts of the University of the Free State, EnactusZA, Enactus Netherlands and the Ford Motor Company, our team was given the opportunity to represent team South Africa on the global stage known as the Enactus World Cup and this is what they had to say about it...\n\nThe experience was transformative for our team members. Competing against teams from over 30 countries, we showcased our innovative projects that address real-world challenges in our community. The exposure to different entrepreneurial approaches and social innovation strategies has equipped us with new perspectives and methodologies.\n\nOur projects, including BioFly-Pro and Revolt Plastics, received significant attention from judges and fellow competitors alike. The networking opportunities were invaluable, connecting us with potential partners, mentors, and sponsors who share our vision for sustainable development.\n\nWe are grateful to all our sponsors and supporters who made this journey possible. This experience has reinforced our commitment to creating positive change through entrepreneurial action.",
    excerpt: "Through the gracious efforts of the University of the Free State, EnactusZA, Enactus Netherlands and the Ford Motor Company, our team was given the opportunity to represent team South Africa on the global stage known as the Enactus World Cup and this is what they had to say about it...",
    published: true,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    title: "ENACTUS UFSQ WINS NATIONAL COMPETITION",
    slug: "enactus-ufsq-wins-national-competition",
    category: "Competitions",
    coverImageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home%20Page%20anim%20start-FRMLHq5cxU9lBK2pKPy7UhiggM1Axz.png",
    body: "Our team has achieved an incredible milestone by winning the national Enactus competition. This victory represents months of hard work, dedication, and innovative thinking from all team members...\n\nThe national competition brought together the best Enactus teams from universities across South Africa. Our presentation highlighted the measurable impact of our projects on local communities, demonstrating sustainable business models that empower individuals and protect the environment.\n\nKey to our success was the comprehensive approach we took in addressing the United Nations Sustainable Development Goals. Our judges were particularly impressed by the scalability of our solutions and the genuine community engagement that underpins all our initiatives.\n\nThis win qualifies us to represent South Africa at the Enactus World Cup, where we will compete against top teams from around the globe.",
    excerpt: "Our team has achieved an incredible milestone by winning the national Enactus competition. This victory represents months of hard work and dedication...",
    published: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "3",
    title: "NEW PROJECT LAUNCH: BIOFLY-PRO",
    slug: "new-project-launch-biofly-pro",
    category: "Projects",
    coverImageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team%20Website-KfSSOjmH0tVewC43DX5gKZ30KmqfgQ.png",
    body: "We are excited to announce the launch of our newest project, BioFly-Pro. This sustainable initiative aims to address environmental challenges through innovative solutions...\n\nBioFly-Pro focuses on converting organic waste into valuable agricultural inputs using black soldier fly larvae. This circular economy approach not only reduces waste in landfills but also produces high-quality protein feed for livestock and organic fertilizer for crops.\n\nWorking closely with local farmers in the QwaQwa region, we have established pilot programs that demonstrate the economic viability of this approach. Early results show promising returns for participating farmers while significantly reducing their environmental footprint.\n\nThe project aligns with multiple UN Sustainable Development Goals, including Zero Hunger, Responsible Consumption and Production, and Climate Action.",
    excerpt: "We are excited to announce the launch of our newest project, BioFly-Pro. This sustainable initiative aims to address environmental challenges...",
    published: true,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
]

const initialProjects: Project[] = [
  {
    id: "1",
    name: "BioFly-Pro",
    industry: "Sustainable Agriculture",
    slogan: "Sustainable & Climate Smart",
    year: "2021",
    description: "Innovative agricultural solutions using black soldier fly larvae to convert organic waste into valuable resources for farming communities.",
    fullDescription: "BioFly-Pro is a social enterprise that addresses food security and waste management challenges in the QwaQwa region. We utilize black soldier fly larvae to convert organic waste into high-quality protein feed for livestock and organic fertilizer for crops.\n\nOur model creates a circular economy where waste becomes a resource. We work directly with local farmers, providing them with training on sustainable farming practices and access to affordable, eco-friendly agricultural inputs.\n\nThe project has trained over 50 local entrepreneurs in BSF farming techniques, established 3 pilot processing facilities, and diverted over 10 tons of organic waste from landfills. Our products now support more than 100 smallholder farmers in the region.",
    coverImageUrl: "",
    logoUrl: "",
    sdgs: [2, 12, 13, 8],
    projectType: "Social Enterprise",
    status: "Active",
    impactMetrics: [
      "50+ entrepreneurs trained",
      "10+ tons of waste diverted",
      "100+ farmers supported",
      "3 processing facilities established"
    ],
    contactEmail: "bioflypro@enactusufsq.org",
    contactPhone: "+27 58 123 4567",
    website: "",
    socialLinks: {
      facebook: "https://facebook.com/bioflypro",
      instagram: "https://instagram.com/bioflypro",
    },
    teamLead: "Thabo Molefe",
    enabled: true,
    createdAt: new Date("2021-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Revolt Plastics",
    industry: "Environmental",
    slogan: "Recycling Revolution",
    year: "2021",
    description: "Transforming plastic waste into valuable products through innovative recycling techniques and community empowerment programs.",
    fullDescription: "Revolt Plastics tackles the plastic pollution crisis by creating economic opportunities from waste. We collect, process, and upcycle plastic waste into marketable products including eco-bricks, furniture, and decorative items.\n\nOur community-based model involves local waste collectors who earn income by gathering plastic waste, which we then process at our facility. We also run educational workshops in schools and communities about responsible waste management.\n\nTo date, we have collected over 5 tons of plastic waste, created jobs for 20 waste collectors, and produced over 1,000 eco-products. Our school outreach program has educated more than 2,000 students about environmental conservation.",
    coverImageUrl: "",
    logoUrl: "",
    sdgs: [11, 12, 13, 1, 8],
    projectType: "Social Enterprise",
    status: "Active",
    impactMetrics: [
      "5+ tons plastic collected",
      "20 waste collectors employed",
      "1,000+ eco-products made",
      "2,000+ students educated"
    ],
    contactEmail: "revoltplastics@enactusufsq.org",
    contactPhone: "+27 58 234 5678",
    website: "",
    socialLinks: {
      facebook: "https://facebook.com/revoltplastics",
      instagram: "https://instagram.com/revoltplastics",
    },
    teamLead: "Lerato Dlamini",
    enabled: true,
    createdAt: new Date("2021-03-20"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "NetNovaSA",
    industry: "Technology & Education",
    slogan: "Connect. Empower. Inspire.",
    year: "2022",
    description: "Bridging the digital divide in rural communities by providing affordable internet access and digital literacy training.",
    fullDescription: "NetNovaSA addresses the critical issue of digital exclusion in rural QwaQwa. We provide affordable internet connectivity and comprehensive digital literacy training to underserved communities.\n\nOur approach combines technology deployment with education. We establish community WiFi hotspots and run training programs covering basic computer skills, online safety, and digital entrepreneurship.\n\nThe project has connected 500+ community members to the internet, trained 200+ individuals in digital literacy, and helped 30 local entrepreneurs establish online presences for their businesses. Our network now covers 5 community centers and 2 schools.",
    coverImageUrl: "",
    logoUrl: "",
    sdgs: [4, 9, 10, 8],
    projectType: "Community Project",
    status: "Active",
    impactMetrics: [
      "500+ people connected",
      "200+ digitally trained",
      "30 businesses online",
      "7 hotspots established"
    ],
    contactEmail: "netnova@enactusufsq.org",
    contactPhone: "+27 58 345 6789",
    website: "",
    socialLinks: {
      facebook: "https://facebook.com/netnovasa",
      linkedin: "https://linkedin.com/company/netnovasa",
    },
    teamLead: "Sipho Nkosi",
    enabled: true,
    createdAt: new Date("2022-06-10"),
    updatedAt: new Date("2024-01-15"),
  },
]

const initialSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Harmony Gold Mining",
    logoUrl: "",
    tier: "Platinum",
    description: "Supporting sustainable community development initiatives across South Africa.",
    website: "https://www.harmony.co.za",
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "MTN",
    logoUrl: "",
    tier: "Gold",
    description: "Empowering digital connectivity and innovation for youth development.",
    website: "https://www.mtn.co.za",
    active: true,
    createdAt: new Date("2020-06-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Ford Motor Company Fund",
    logoUrl: "",
    tier: "Gold",
    description: "Driving positive change through education and entrepreneurship programs.",
    website: "https://www.ford.co.za",
    active: true,
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "AVI",
    logoUrl: "",
    tier: "Silver",
    description: "Growing great brands and supporting community development.",
    website: "https://www.avi.co.za",
    active: true,
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

const initialPositions: Position[] = [
  {
    id: "1",
    title: "Project Manager",
    department: "Operations",
    type: "Volunteer",
    description: "Lead and coordinate project teams, manage timelines, and ensure successful project delivery. Requires strong organizational and communication skills.",
    active: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Marketing Coordinator",
    department: "Marketing",
    type: "Volunteer",
    description: "Develop and execute marketing strategies to promote Enactus UFSQ and its projects across social media and traditional channels.",
    active: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    title: "Finance Officer",
    department: "Finance",
    type: "Volunteer",
    description: "Manage team finances, prepare budgets, track expenses, and assist with fundraising initiatives.",
    active: true,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
]

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors)
  const [positions, setPositions] = useState<Position[]>(initialPositions)
  const [applications, setApplications] = useState<Application[]>([])

  // Article functions
  const addArticle = (articleData: Omit<Article, "id" | "slug" | "createdAt" | "updatedAt">) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      slug: generateSlug(articleData.title),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setArticles((prev) => [newArticle, ...prev])
  }

  const updateArticle = (id: string, articleData: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? {
              ...article,
              ...articleData,
              slug: articleData.title ? generateSlug(articleData.title) : article.slug,
              updatedAt: new Date(),
            }
          : article
      )
    )
  }

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id))
  }

  const getPublishedArticles = () => {
    return articles.filter((article) => article.published).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const getLatestPublishedArticles = (count: number) => {
    return getPublishedArticles().slice(0, count)
  }

  const getArticleBySlug = (slug: string) => {
    return articles.find((article) => article.slug === slug && article.published)
  }

  // Project functions
  const addProject = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setProjects((prev) => [newProject, ...prev])
  }

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...projectData, updatedAt: new Date() } : project
      )
    )
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  const getEnabledProjects = () => {
    return projects.filter((project) => project.enabled).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const getLatestEnabledProjects = (count: number) => {
    return getEnabledProjects().slice(0, count)
  }

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id && project.enabled)
  }

  // Sponsor functions
  const addSponsor = (sponsorData: Omit<Sponsor, "id" | "createdAt" | "updatedAt">) => {
    const newSponsor: Sponsor = {
      ...sponsorData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSponsors((prev) => [newSponsor, ...prev])
  }

  const updateSponsor = (id: string, sponsorData: Partial<Sponsor>) => {
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, ...sponsorData, updatedAt: new Date() } : sponsor
      )
    )
  }

  const deleteSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== id))
  }

  const getActiveSponsors = () => {
    return sponsors.filter((sponsor) => sponsor.active)
  }

  // Position functions
  const addPosition = (positionData: Omit<Position, "id" | "createdAt" | "updatedAt">) => {
    const newPosition: Position = {
      ...positionData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setPositions((prev) => [newPosition, ...prev])
  }

  const updatePosition = (id: string, positionData: Partial<Position>) => {
    setPositions((prev) =>
      prev.map((position) =>
        position.id === id ? { ...position, ...positionData, updatedAt: new Date() } : position
      )
    )
  }

  const deletePosition = (id: string) => {
    setPositions((prev) => prev.filter((position) => position.id !== id))
  }

  const getActivePositions = () => {
    return positions.filter((position) => position.active)
  }

  // Application functions
  const addApplication = (applicationData: Omit<Application, "id" | "reviewed" | "createdAt">) => {
    const newApplication: Application = {
      ...applicationData,
      id: Date.now().toString(),
      reviewed: false,
      createdAt: new Date(),
    }
    setApplications((prev) => [newApplication, ...prev])
  }

  const markApplicationReviewed = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, reviewed: true } : app))
    )
  }

  const getApplications = () => {
    return applications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  return (
    <DataContext.Provider
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        getPublishedArticles,
        getLatestPublishedArticles,
        getArticleBySlug,
        projects,
        addProject,
        updateProject,
        deleteProject,
        getEnabledProjects,
        getLatestEnabledProjects,
        getProjectById,
        sponsors,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        getActiveSponsors,
        positions,
        addPosition,
        updatePosition,
        deletePosition,
        getActivePositions,
        applications,
        addApplication,
        markApplicationReviewed,
        getApplications,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
