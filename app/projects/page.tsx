"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useData } from "@/context/data-context"

export default function ProjectsPage() {
  const { getEnabledProjects } = useData()
  const projects = getEnabledProjects()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-[#F5A800] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              OUR PROJECTS
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Discover our innovative social enterprises that are making a real impact in communities across South Africa.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F5A800] flex items-center justify-center text-white font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-[#333]">{project.name}</h3>
                          <p className="text-xs text-gray-500">{project.industry}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                      {project.coverImageUrl ? (
                        <img
                          src={project.coverImageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F5A800]/20 to-[#F5A800]/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-[#F5A800]/30">{project.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <p className="font-semibold text-sm text-[#333]">{project.slogan}</p>
                      <p className="text-xs text-gray-500">Est. {project.year}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600">
                        Enabled
                      </span>
                      <span className="px-3 py-1 text-xs bg-[#F5A800] text-white rounded-full">
                        Enabled
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
