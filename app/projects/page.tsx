"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData, SDG_LIST, Project } from "@/context/data-context"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Target, 
  Mail, 
  Phone, 
  Globe,
  ExternalLink,
  ChevronRight
} from "lucide-react"

function SDGBadge({ sdgId, size = "sm" }: { sdgId: number; size?: "sm" | "md" }) {
  const sdg = SDG_LIST.find(s => s.id === sdgId)
  if (!sdg) return null
  
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full text-white ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      }`}
      style={{ backgroundColor: sdg.color }}
      title={sdg.name}
    >
      SDG {sdgId}
    </span>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article 
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#F5A800]/30"
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#F5A800]/10 to-[#F5A800]/5 overflow-hidden">
        {project.coverImageUrl ? (
          <img
            src={project.coverImageUrl}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#F5A800] flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">{project.name.charAt(0)}</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm ${
            project.status === "Active" 
              ? "bg-green-500/90 text-white" 
              : project.status === "Completed"
              ? "bg-gray-600/90 text-white"
              : "bg-[#F5A800]/90 text-white"
          }`}>
            {project.status}
          </span>
        </div>

        {/* Project Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-gray-700">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#F5A800] transition-colors line-clamp-1">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-[#F5A800] font-medium">{project.industry}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Est. {project.year}</span>
          </div>
        </div>
        
        {/* Slogan */}
        <p className="text-sm text-gray-600 italic mb-3">&quot;{project.slogan}&quot;</p>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* SDG Tags */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
            Sustainable Development Goals
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.sdgs.slice(0, 4).map((sdgId) => (
              <SDGBadge key={sdgId} sdgId={sdgId} size="sm" />
            ))}
            {project.sdgs.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-gray-600">
                +{project.sdgs.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Led by {project.teamLead}
          </span>
          <span className="inline-flex items-center text-[#F5A800] text-sm font-semibold group-hover:gap-2 transition-all">
            Details
            <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  )
}

function ProjectDetailModal({ 
  project, 
  open, 
  onClose 
}: { 
  project: Project | null; 
  open: boolean; 
  onClose: () => void 
}) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Section */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-[#F5A800] to-[#E09800] overflow-hidden">
          {project.coverImageUrl ? (
            <>
              <img
                src={project.coverImageUrl}
                alt={project.name}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center shrink-0">
                <span className="text-2xl md:text-3xl font-bold text-[#F5A800]">{project.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <DialogHeader className="text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      project.status === "Active" 
                        ? "bg-green-500 text-white" 
                        : project.status === "Completed"
                        ? "bg-gray-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {project.status}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                      {project.projectType}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                    {project.name}
                  </DialogTitle>
                  <DialogDescription className="text-white/80 text-base">
                    {project.slogan}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto text-[#F5A800] mb-2" />
              <p className="text-xs text-gray-500 mb-1">Established</p>
              <p className="font-semibold text-gray-900">{project.year}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Target className="w-5 h-5 mx-auto text-[#F5A800] mb-2" />
              <p className="text-xs text-gray-500 mb-1">Industry</p>
              <p className="font-semibold text-gray-900 text-sm">{project.industry}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Users className="w-5 h-5 mx-auto text-[#F5A800] mb-2" />
              <p className="text-xs text-gray-500 mb-1">Team Lead</p>
              <p className="font-semibold text-gray-900 text-sm">{project.teamLead}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Globe className="w-5 h-5 mx-auto text-[#F5A800] mb-2" />
              <p className="text-xs text-gray-500 mb-1">SDGs Addressed</p>
              <p className="font-semibold text-gray-900">{project.sdgs.length}</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">About the Project</h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.description}
            </div>
          </div>

          {/* SDGs */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Sustainable Development Goals</h3>
            <div className="flex flex-wrap gap-2">
              {project.sdgs.map((sdgId) => {
                const sdg = SDG_LIST.find(s => s.id === sdgId)
                return sdg ? (
                  <div
                    key={sdgId}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: sdg.color }}
                  >
                    <span className="font-bold">SDG {sdgId}</span>
                    <span className="opacity-90">|</span>
                    <span>{sdg.name}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>

          {/* Impact Metrics */}
          {project.impactMetrics.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Impact Metrics</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.impactMetrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-[#F5A800]/5 border border-[#F5A800]/20 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F5A800] flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.contactEmail && (
                <a 
                  href={`mailto:${project.contactEmail}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5A800]/10 flex items-center justify-center group-hover:bg-[#F5A800]/20 transition-colors">
                    <Mail className="w-5 h-5 text-[#F5A800]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{project.contactEmail}</p>
                  </div>
                </a>
              )}
              {project.contactPhone && (
                <a 
                  href={`tel:${project.contactPhone}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5A800]/10 flex items-center justify-center group-hover:bg-[#F5A800]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#F5A800]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{project.contactPhone}</p>
                  </div>
                </a>
              )}
              {project.website && (
                <a 
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5A800]/10 flex items-center justify-center group-hover:bg-[#F5A800]/20 transition-colors">
                    <Globe className="w-5 h-5 text-[#F5A800]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Website</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{project.website}</p>
                  </div>
                </a>
              )}
            </div>

            {/* Social Links */}
            {Object.values(project.socialLinks).some(link => link) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Follow us on social media</p>
                <div className="flex gap-3">
                  {project.socialLinks.facebook && (
                    <a
                      href={project.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {project.socialLinks.instagram && (
                    <a
                      href={project.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {project.socialLinks.linkedin && (
                    <a
                      href={project.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {project.socialLinks.twitter && (
                    <a
                      href={project.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8 border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ProjectsPage() {
  const { getEnabledProjects } = useData()
  const projects = getEnabledProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-[#F5A800] py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 text-center relative">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
              Making a Difference
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              OUR PROJECTS
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Discover our innovative social enterprises creating lasting impact through entrepreneurial action and sustainable solutions.
            </p>
          </div>
        </section>

        {/* SDG Legend */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-500 text-center mb-4">
              Our projects align with the UN Sustainable Development Goals
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SDG_LIST.slice(0, 10).map((sdg) => (
                <div
                  key={sdg.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: sdg.color }}
                  title={sdg.name}
                >
                  <span>{sdg.id}</span>
                  <span className="hidden sm:inline opacity-80">|</span>
                  <span className="hidden sm:inline text-[10px]">{sdg.name}</span>
                </div>
              ))}
              <span className="px-2.5 py-1 text-xs text-gray-500">+ more</span>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {projects.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-500">Check back soon for our upcoming initiatives.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Want to Get Involved?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Join our team and be part of creating meaningful change in communities through innovative projects.
            </p>
            <a
              href="/join-us"
              className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#F5A800]/25"
            >
              JOIN ENACTUS UFSQ
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
