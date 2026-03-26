"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useData, Article, Project, Sponsor, Position, Application } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, LogOut, Home, Newspaper, FolderKanban, Building2, Users, Inbox, Download, Check } from "lucide-react"

const articleCategories = ["Competitions", "Projects", "Team News", "Events", "Achievements"]
const sponsorTiers = ["Platinum", "Gold", "Silver"] as const
const positionTypes = ["Volunteer", "Part-time"] as const

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth()
  const {
    articles, addArticle, updateArticle, deleteArticle,
    projects, addProject, updateProject, deleteProject,
    sponsors, addSponsor, updateSponsor, deleteSponsor,
    positions, addPosition, updatePosition, deletePosition,
    applications, markApplicationReviewed, getApplications,
  } = useData()
  const router = useRouter()

  // Dialog states
  const [articleDialogOpen, setArticleDialogOpen] = useState(false)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false)
  const [positionDialogOpen, setPositionDialogOpen] = useState(false)

  // Editing states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: "", category: "", coverImageUrl: "", body: "", excerpt: "", published: false,
  })
  const [projectForm, setProjectForm] = useState({
    name: "", industry: "", slogan: "", year: "", description: "", coverImageUrl: "", enabled: false,
  })
  const [sponsorForm, setSponsorForm] = useState({
    name: "", logoUrl: "", tier: "Gold" as "Platinum" | "Gold" | "Silver", description: "", active: false,
  })
  const [positionForm, setPositionForm] = useState({
    title: "", department: "", type: "Volunteer" as "Volunteer" | "Part-time", description: "", active: false,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Article handlers
  const openArticleDialog = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setArticleForm({
        title: article.title, category: article.category, coverImageUrl: article.coverImageUrl,
        body: article.body, excerpt: article.excerpt, published: article.published,
      })
    } else {
      setEditingArticle(null)
      setArticleForm({ title: "", category: "", coverImageUrl: "", body: "", excerpt: "", published: false })
    }
    setArticleDialogOpen(true)
  }

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingArticle) {
      updateArticle(editingArticle.id, articleForm)
    } else {
      addArticle(articleForm)
    }
    setArticleDialogOpen(false)
    setEditingArticle(null)
  }

  // Project handlers
  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setProjectForm({
        name: project.name, industry: project.industry, slogan: project.slogan,
        year: project.year, description: project.description, coverImageUrl: project.coverImageUrl, enabled: project.enabled,
      })
    } else {
      setEditingProject(null)
      setProjectForm({ name: "", industry: "", slogan: "", year: "", description: "", coverImageUrl: "", enabled: false })
    }
    setProjectDialogOpen(true)
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      updateProject(editingProject.id, projectForm)
    } else {
      addProject(projectForm)
    }
    setProjectDialogOpen(false)
    setEditingProject(null)
  }

  // Sponsor handlers
  const openSponsorDialog = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor)
      setSponsorForm({
        name: sponsor.name, logoUrl: sponsor.logoUrl, tier: sponsor.tier,
        description: sponsor.description, active: sponsor.active,
      })
    } else {
      setEditingSponsor(null)
      setSponsorForm({ name: "", logoUrl: "", tier: "Gold", description: "", active: false })
    }
    setSponsorDialogOpen(true)
  }

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSponsor) {
      updateSponsor(editingSponsor.id, sponsorForm)
    } else {
      addSponsor(sponsorForm)
    }
    setSponsorDialogOpen(false)
    setEditingSponsor(null)
  }

  // Position handlers
  const openPositionDialog = (position?: Position) => {
    if (position) {
      setEditingPosition(position)
      setPositionForm({
        title: position.title, department: position.department, type: position.type,
        description: position.description, active: position.active,
      })
    } else {
      setEditingPosition(null)
      setPositionForm({ title: "", department: "", type: "Volunteer", description: "", active: false })
    }
    setPositionDialogOpen(true)
  }

  const handlePositionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPosition) {
      updatePosition(editingPosition.id, positionForm)
    } else {
      addPosition(positionForm)
    }
    setPositionDialogOpen(false)
    setEditingPosition(null)
  }

  // Export applications as CSV
  const exportApplicationsCSV = () => {
    const apps = getApplications()
    const headers = ["Name", "Email", "Student Number", "Faculty", "Year of Study", "Position", "Skills", "Motivation", "Date", "Reviewed"]
    const rows = apps.map((app) => {
      const isGeneralMember = app.positionId === "general-member"
      const position = positions.find((p) => p.id === app.positionId)
      return [
        app.name, app.email, app.studentNumber, app.faculty, app.yearOfStudy || "",
        isGeneralMember ? "General Member" : (position?.title || "Unknown"),
        (app.skills || "").replace(/,/g, ";"), app.motivation.replace(/,/g, ";"),
        app.createdAt.toLocaleDateString(), app.reviewed ? "Yes" : "No",
      ].join(",")
    })
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
              <path d="M20 5L35 20L20 35L5 20L20 5Z" fill="#F5A800" />
              <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#F5A800" stroke="white" strokeWidth="1" />
            </svg>
            <div>
              <h1 className="font-bold text-[#333]">Enactus UFSQ</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-gray-600">
              <Home className="w-4 h-4 mr-2" />View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="news" className="data-[state=active]:bg-[#F5A800] data-[state=active]:text-white">
              <Newspaper className="w-4 h-4 mr-2" />News
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#F5A800] data-[state=active]:text-white">
              <FolderKanban className="w-4 h-4 mr-2" />Projects
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="data-[state=active]:bg-[#F5A800] data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />Sponsors
            </TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-[#F5A800] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />Positions
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#F5A800] data-[state=active]:text-white">
              <Inbox className="w-4 h-4 mr-2" />Applications
            </TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>News Manager</CardTitle>
                    <CardDescription>The 3 most recent published articles appear in the homepage hero carousel.</CardDescription>
                  </div>
                  <Button onClick={() => openArticleDialog()} className="bg-[#F5A800] hover:bg-[#E09800] text-white">
                    <Plus className="w-4 h-4 mr-2" />New Article
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">No articles yet.</TableCell>
                      </TableRow>
                    ) : (
                      articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                          <TableCell>{article.category}</TableCell>
                          <TableCell>{article.createdAt.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={article.published ? "default" : "secondary"} className={article.published ? "bg-green-100 text-green-800" : ""}>
                              {article.published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openArticleDialog(article)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => confirm("Delete?") && deleteArticle(article.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects Manager</CardTitle>
                    <CardDescription>Enabled projects appear on the public Projects page and homepage.</CardDescription>
                  </div>
                  <Button onClick={() => openProjectDialog()} className="bg-[#F5A800] hover:bg-[#E09800] text-white">
                    <Plus className="w-4 h-4 mr-2" />New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">No projects yet.</TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>{project.industry}</TableCell>
                          <TableCell>
                            <Badge variant={project.enabled ? "default" : "secondary"} className={project.enabled ? "bg-green-100 text-green-800" : ""}>
                              {project.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openProjectDialog(project)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => confirm("Delete?") && deleteProject(project.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sponsors Tab */}
          <TabsContent value="sponsors">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sponsors Manager</CardTitle>
                    <CardDescription>Active sponsors appear on the public Sponsors page and homepage.</CardDescription>
                  </div>
                  <Button onClick={() => openSponsorDialog()} className="bg-[#F5A800] hover:bg-[#E09800] text-white">
                    <Plus className="w-4 h-4 mr-2" />New Sponsor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sponsors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">No sponsors yet.</TableCell>
                      </TableRow>
                    ) : (
                      sponsors.map((sponsor) => (
                        <TableRow key={sponsor.id}>
                          <TableCell className="font-medium">{sponsor.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              sponsor.tier === "Platinum" ? "border-gray-400 text-gray-600" :
                              sponsor.tier === "Gold" ? "border-[#F5A800] text-[#F5A800]" : "border-gray-300 text-gray-500"
                            }>{sponsor.tier}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={sponsor.active ? "default" : "secondary"} className={sponsor.active ? "bg-green-100 text-green-800" : ""}>
                              {sponsor.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openSponsorDialog(sponsor)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => confirm("Delete?") && deleteSponsor(sponsor.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Positions Tab */}
          <TabsContent value="positions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Positions Manager</CardTitle>
                    <CardDescription>Active positions appear on the Join Us page application form.</CardDescription>
                  </div>
                  <Button onClick={() => openPositionDialog()} className="bg-[#F5A800] hover:bg-[#E09800] text-white">
                    <Plus className="w-4 h-4 mr-2" />New Position
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">No positions yet.</TableCell>
                      </TableRow>
                    ) : (
                      positions.map((position) => (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">{position.title}</TableCell>
                          <TableCell>{position.department}</TableCell>
                          <TableCell>{position.type}</TableCell>
                          <TableCell>
                            <Badge variant={position.active ? "default" : "secondary"} className={position.active ? "bg-green-100 text-green-800" : ""}>
                              {position.active ? "Active" : "Closed"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openPositionDialog(position)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => confirm("Delete?") && deletePosition(position.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Applications Inbox</CardTitle>
                    <CardDescription>Review applications submitted through the Join Us page.</CardDescription>
                  </div>
                  <Button onClick={exportApplicationsCSV} variant="outline" disabled={applications.length === 0}>
                    <Download className="w-4 h-4 mr-2" />Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">No applications yet.</TableCell>
                      </TableRow>
                    ) : (
                      getApplications().map((app) => {
                        const isGeneralMember = app.positionId === "general-member"
                        const position = positions.find((p) => p.id === app.positionId)
                        return (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>
                              {isGeneralMember ? (
                                <span className="text-[#F5A800] font-medium">General Member</span>
                              ) : (
                                position?.title || "Unknown"
                              )}
                            </TableCell>
                            <TableCell>{app.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={app.reviewed ? "default" : "secondary"} className={app.reviewed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {app.reviewed ? "Reviewed" : "New"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {!app.reviewed && (
                                <Button variant="ghost" size="sm" onClick={() => markApplicationReviewed(app.id)} className="text-green-600">
                                  <Check className="w-4 h-4 mr-1" />Mark Reviewed
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Article Dialog */}
      <Dialog open={articleDialogOpen} onOpenChange={setArticleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingArticle ? "Edit Article" : "Create New Article"}</DialogTitle>
            <DialogDescription>{editingArticle ? "Update the article details." : "Fill in the details to create a new article."}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleArticleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select value={articleForm.category} onValueChange={(v) => setArticleForm({ ...articleForm, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {articleCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Cover Image URL</FieldLabel>
                <Input value={articleForm.coverImageUrl} onChange={(e) => setArticleForm({ ...articleForm, coverImageUrl: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Excerpt</FieldLabel>
                <Textarea value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })} rows={2} required />
              </Field>
              <Field>
                <FieldLabel>Body</FieldLabel>
                <Textarea value={articleForm.body} onChange={(e) => setArticleForm({ ...articleForm, body: e.target.value })} rows={6} required />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Published</FieldLabel>
                  <Switch checked={articleForm.published} onCheckedChange={(c) => setArticleForm({ ...articleForm, published: c })} />
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setArticleDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#F5A800] hover:bg-[#E09800] text-white">{editingArticle ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
            <DialogDescription>{editingProject ? "Update the project details." : "Fill in the details to create a new project."}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Project Name</FieldLabel>
                <Input value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Industry</FieldLabel>
                <Input value={projectForm.industry} onChange={(e) => setProjectForm({ ...projectForm, industry: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Slogan</FieldLabel>
                <Input value={projectForm.slogan} onChange={(e) => setProjectForm({ ...projectForm, slogan: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Established Year</FieldLabel>
                <Input value={projectForm.year} onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })} placeholder="2021" required />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} required />
              </Field>
              <Field>
                <FieldLabel>Cover Image URL</FieldLabel>
                <Input value={projectForm.coverImageUrl} onChange={(e) => setProjectForm({ ...projectForm, coverImageUrl: e.target.value })} />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Enabled</FieldLabel>
                  <Switch checked={projectForm.enabled} onCheckedChange={(c) => setProjectForm({ ...projectForm, enabled: c })} />
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#F5A800] hover:bg-[#E09800] text-white">{editingProject ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sponsor Dialog */}
      <Dialog open={sponsorDialogOpen} onOpenChange={setSponsorDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingSponsor ? "Edit Sponsor" : "Create New Sponsor"}</DialogTitle>
            <DialogDescription>{editingSponsor ? "Update the sponsor details." : "Fill in the details to add a new sponsor."}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSponsorSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input value={sponsorForm.name} onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Logo URL</FieldLabel>
                <Input value={sponsorForm.logoUrl} onChange={(e) => setSponsorForm({ ...sponsorForm, logoUrl: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel>Tier</FieldLabel>
                <Select value={sponsorForm.tier} onValueChange={(v: "Platinum" | "Gold" | "Silver") => setSponsorForm({ ...sponsorForm, tier: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {sponsorTiers.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea value={sponsorForm.description} onChange={(e) => setSponsorForm({ ...sponsorForm, description: e.target.value })} rows={2} required />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Active</FieldLabel>
                  <Switch checked={sponsorForm.active} onCheckedChange={(c) => setSponsorForm({ ...sponsorForm, active: c })} />
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setSponsorDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#F5A800] hover:bg-[#E09800] text-white">{editingSponsor ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Position Dialog */}
      <Dialog open={positionDialogOpen} onOpenChange={setPositionDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPosition ? "Edit Position" : "Create New Position"}</DialogTitle>
            <DialogDescription>{editingPosition ? "Update the position details." : "Fill in the details to create a new position."}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePositionSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input value={positionForm.title} onChange={(e) => setPositionForm({ ...positionForm, title: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Department</FieldLabel>
                <Input value={positionForm.department} onChange={(e) => setPositionForm({ ...positionForm, department: e.target.value })} required />
              </Field>
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Select value={positionForm.type} onValueChange={(v: "Volunteer" | "Part-time") => setPositionForm({ ...positionForm, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {positionTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea value={positionForm.description} onChange={(e) => setPositionForm({ ...positionForm, description: e.target.value })} rows={3} required />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Active</FieldLabel>
                  <Switch checked={positionForm.active} onCheckedChange={(c) => setPositionForm({ ...positionForm, active: c })} />
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setPositionDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#F5A800] hover:bg-[#E09800] text-white">{editingPosition ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
