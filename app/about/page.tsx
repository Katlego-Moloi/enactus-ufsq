"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "Enactus UFSQ was established at the University of the Free State QwaQwa Campus.",
  },
  {
    year: "2019",
    title: "First National Competition",
    description: "Competed in our first Enactus South Africa National Competition.",
  },
  {
    year: "2021",
    title: "Project Launch",
    description: "Launched BioFly-Pro and Revolt Plastics projects addressing environmental challenges.",
  },
  {
    year: "2022",
    title: "National Champions",
    description: "Won the Enactus South Africa National Competition, qualifying for the World Cup.",
  },
  {
    year: "2023",
    title: "Enactus World Cup - Netherlands",
    description: "Represented South Africa at the Enactus World Cup in the Netherlands.",
  },
  {
    year: "2024",
    title: "Continued Impact",
    description: "Expanded our projects and community reach, impacting thousands of lives.",
  },
]

const teamMembers = [
  { name: "Thabo Mokoena", role: "President", linkedin: "#" },
  { name: "Naledi Dlamini", role: "Vice President", linkedin: "#" },
  { name: "Sipho Nkosi", role: "Project Manager", linkedin: "#" },
  { name: "Lerato Molefe", role: "Marketing Lead", linkedin: "#" },
  { name: "Kagiso Mthembu", role: "Finance Manager", linkedin: "#" },
  { name: "Nomvula Zulu", role: "Operations Lead", linkedin: "#" },
]

const facultyAdvisor = {
  name: "Prof. James Ndlovu",
  role: "Faculty Advisor",
  department: "Department of Business Management",
  linkedin: "#",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-[#333] py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#333]/95 to-[#333]/80" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  WHO WE ARE
                </h1>
                <p className="text-white/90 text-lg leading-relaxed">
                  Enactus UFSQ is a vibrant community of change-makers committed to making a positive impact on the world around us.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-700">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home%20Page%20anim%20start-FRMLHq5cxU9lBK2pKPy7UhiggM1Axz.png"
                    alt="Enactus UFSQ Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-8">
                OUR STORY
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  Welcome to Enactus UFSQ, a vibrant community of change-makers committed to making a positive impact on the world around us. As students from the University of the Free State QwaQwa Campus, we are proud members of the Enactus team, a collective driven by innovation, passion, and a shared vision for social transformation.
                </p>
                <p className="mb-6">
                  Our mission goes beyond the boundaries of classrooms and textbooks; we are dedicated to improving our local community and the world at large. However, our impact extends far beyond these specific initiatives. With a diverse array of enterprise teams, each tackling unique challenges, we strive to address pressing issues and create lasting change.
                </p>
                <p className="mb-6">
                  We invite you to explore the stories, projects, and initiatives that define who we are and what we stand for. Join us on this journey of innovation, collaboration, and making a meaningful difference in the lives of those we serve.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="border-l-4 border-l-[#F5A800]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#333] mb-4">Our Mission</h3>
                    <p className="text-gray-600">
                      To engage students in entrepreneurial action that transforms lives and shapes a better, more sustainable world through innovative and sustainable projects.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-[#F5A800]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#333] mb-4">Our Vision</h3>
                    <p className="text-gray-600">
                      To be a leading force for positive change, empowering communities through entrepreneurship and creating a ripple effect of sustainable development across South Africa and beyond.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Timeline */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
              OUR ACHIEVEMENTS
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#F5A800] transform md:-translate-x-1/2" />
                
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#F5A800] rounded-full transform -translate-x-1/2 mt-2" />
                    
                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <Card className="inline-block">
                        <CardContent className="p-4">
                          <span className="inline-block px-3 py-1 bg-[#F5A800] text-white text-sm font-bold rounded mb-2">
                            {milestone.year}
                          </span>
                          <h3 className="font-bold text-[#333] mb-1">{milestone.title}</h3>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
              MEET THE TEAM
            </h2>

            {/* Faculty Advisor - Pinned */}
            <div className="max-w-sm mx-auto mb-12">
              <Card className="border-2 border-[#F5A800] bg-[#F5A800]/5">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">
                      {facultyAdvisor.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[#333]">{facultyAdvisor.name}</h3>
                  <p className="text-[#F5A800] font-medium">{facultyAdvisor.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{facultyAdvisor.department}</p>
                  <a
                    href={facultyAdvisor.linkedin}
                    className="inline-flex items-center justify-center w-8 h-8 bg-[#0077B5] text-white rounded hover:bg-[#0077B5]/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Team Members Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.name}>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-400">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#333]">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center justify-center w-8 h-8 bg-[#0077B5] text-white rounded hover:bg-[#0077B5]/80 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
