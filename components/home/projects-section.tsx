"use client"

import Link from "next/link"
import { useData, SDG_LIST } from "@/context/data-context"
import { ArrowRight } from "lucide-react"

export function ProjectsSection() {
  const { getLatestEnabledProjects } = useData()
  const projects = getLatestEnabledProjects(3)

  return (
    <section className="py-16 md:py-20 bg-[#e8e8e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-4">
          PROJECTS
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover our innovative social enterprises creating lasting impact in communities.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group">
              <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F5A800]/20 to-[#F5A800]/5 overflow-hidden">
                  {project.coverImageUrl ? (
                    <img
                      src={project.coverImageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#F5A800] flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{project.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === "Active" 
                        ? "bg-green-500 text-white" 
                        : project.status === "Completed"
                        ? "bg-gray-500 text-white"
                        : "bg-[#F5A800] text-white"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-[#333] group-hover:text-[#F5A800] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">{project.slogan}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* SDG Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.sdgs.slice(0, 4).map((sdgId) => {
                      const sdg = SDG_LIST.find(s => s.id === sdgId)
                      return sdg ? (
                        <span
                          key={sdgId}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full text-white"
                          style={{ backgroundColor: sdg.color }}
                          title={sdg.name}
                        >
                          SDG {sdgId}
                        </span>
                      ) : null
                    })}
                    {project.sdgs.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-200 text-gray-600">
                        +{project.sdgs.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Details Link */}
                  <div className="flex items-center text-[#F5A800] text-sm font-medium group-hover:gap-2 transition-all">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            VIEW ALL PROJECTS
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
