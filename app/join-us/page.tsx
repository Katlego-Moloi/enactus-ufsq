"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, Globe, Award, Plane, Check } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Leadership",
    description: "Develop essential leadership skills through hands-on project management and team collaboration.",
  },
  {
    icon: Globe,
    title: "Network",
    description: "Connect with like-minded students, professionals, and industry leaders across the globe.",
  },
  {
    icon: Award,
    title: "Real-World Impact",
    description: "Create tangible change in communities while building a portfolio of social impact projects.",
  },
  {
    icon: Plane,
    title: "Travel Opportunities",
    description: "Represent your team at national and international Enactus competitions around the world.",
  },
]

const timeline = [
  { step: 1, title: "Apply", description: "Submit your application" },
  { step: 2, title: "Interview", description: "Meet with our team" },
  { step: 3, title: "Onboarding", description: "Get trained and oriented" },
  { step: 4, title: "Active Member", description: "Start making an impact" },
]

export default function JoinUsPage() {
  const { getActivePositions, addApplication, positions } = useData()
  const activePositions = getActivePositions()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNumber: "",
    faculty: "",
    positionId: "",
    motivation: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addApplication(formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      studentNumber: "",
      faculty: "",
      positionId: "",
      motivation: "",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-[#F5A800] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              BE A CHANGE-MAKER
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Join a community of passionate students using entrepreneurial action to improve lives and create a better, more sustainable world.
            </p>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
              WHY JOIN ENACTUS UFSQ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-[#F5A800]/10 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="w-8 h-8 text-[#F5A800]" />
                    </div>
                    <CardTitle className="text-lg text-[#333]">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Available Positions Section */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
              AVAILABLE POSITIONS
            </h2>
            {activePositions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  No open positions at the moment — check back soon.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {activePositions.map((position) => (
                  <Card key={position.id} className="bg-white">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-[#333]">{position.title}</CardTitle>
                          <p className="text-sm text-gray-500">{position.department}</p>
                        </div>
                        <span className="px-3 py-1 text-xs bg-[#F5A800]/10 text-[#F5A800] rounded-full font-medium">
                          {position.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{position.description}</p>
                      <a href="#apply">
                        <Button className="w-full bg-[#F5A800] hover:bg-[#E09800] text-white">
                          Apply Now
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recruitment Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
              RECRUITMENT PROCESS
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-32">
                    <div className="w-12 h-12 rounded-full bg-[#F5A800] text-white flex items-center justify-center font-bold text-lg mb-2">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-[#333]">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block w-16 h-[2px] bg-[#F5A800] mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-4">
              APPLY NOW
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
              Take the first step towards becoming a change-maker. Fill out the form below and our team will get back to you.
            </p>

            {submitted ? (
              <div className="max-w-xl mx-auto">
                <Card className="bg-[#F5A800]/10 border-[#F5A800]">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-[#F5A800] rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#333] mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">
                      Thank you for your interest in joining Enactus UFSQ. We will review your application and get back to you soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white"
                    >
                      Submit Another Application
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="max-w-xl mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="studentNumber">Student Number</FieldLabel>
                        <Input
                          id="studentNumber"
                          value={formData.studentNumber}
                          onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                          placeholder="Enter your student number"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="faculty">Faculty</FieldLabel>
                        <Input
                          id="faculty"
                          value={formData.faculty}
                          onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                          placeholder="e.g., Faculty of Economic and Management Sciences"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="position">Position</FieldLabel>
                        <Select
                          value={formData.positionId}
                          onValueChange={(value) => setFormData({ ...formData, positionId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                          <SelectContent>
                            {activePositions.map((position) => (
                              <SelectItem key={position.id} value={position.id}>
                                {position.title} - {position.department}
                              </SelectItem>
                            ))}
                            {activePositions.length === 0 && (
                              <SelectItem value="general" disabled>
                                No positions available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="motivation">Motivation</FieldLabel>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="Tell us why you want to join Enactus UFSQ and what skills you can bring to the team..."
                          rows={5}
                          required
                        />
                      </Field>

                      <Button
                        type="submit"
                        className="w-full bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold py-3"
                        disabled={activePositions.length === 0}
                      >
                        SUBMIT APPLICATION
                      </Button>
                    </FieldGroup>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
