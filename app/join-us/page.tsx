"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Users, 
  Globe, 
  Award, 
  Plane, 
  Check, 
  Lightbulb,
  Heart,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles
} from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Leadership Development",
    description: "Develop essential leadership skills through hands-on project management and team collaboration experiences.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with like-minded students, professionals, and industry leaders across 33 countries worldwide.",
  },
  {
    icon: Award,
    title: "Real-World Impact",
    description: "Create tangible change in communities while building a portfolio of meaningful social impact projects.",
  },
  {
    icon: Plane,
    title: "Travel Opportunities",
    description: "Represent your team at national and international Enactus competitions around the world.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Skills",
    description: "Learn to apply business principles and innovation to solve real-world community challenges.",
  },
  {
    icon: Briefcase,
    title: "Career Readiness",
    description: "Gain practical experience that employers value and build connections with industry professionals.",
  },
]

const timeline = [
  { step: 1, title: "Apply", description: "Submit your application online" },
  { step: 2, title: "Interview", description: "Meet with our team leads" },
  { step: 3, title: "Onboarding", description: "Get trained and oriented" },
  { step: 4, title: "Active Member", description: "Start making an impact" },
]

const membershipTypes = [
  {
    id: "general",
    title: "General Member",
    description: "Join our community and contribute to various projects",
    features: [
      "Participate in all team activities",
      "Learn from experienced members",
      "Contribute to ongoing projects",
      "Access to workshops and training"
    ],
    icon: Heart,
    highlight: true,
  },
  {
    id: "specific",
    title: "Specific Position",
    description: "Apply for a specific role based on your skills",
    features: [
      "Focused responsibility area",
      "Leadership opportunities",
      "Specialized skill development",
      "Direct project ownership"
    ],
    icon: Briefcase,
    highlight: false,
  },
]

export default function JoinUsPage() {
  const { getActivePositions, addApplication } = useData()
  const activePositions = getActivePositions()

  const [membershipType, setMembershipType] = useState<"general" | "specific" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNumber: "",
    faculty: "",
    yearOfStudy: "",
    positionId: "",
    motivation: "",
    skills: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addApplication({
      ...formData,
      positionId: membershipType === "general" ? "general-member" : formData.positionId,
    })
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      studentNumber: "",
      faculty: "",
      yearOfStudy: "",
      positionId: "",
      motivation: "",
      skills: "",
    })
  }

  const resetForm = () => {
    setSubmitted(false)
    setMembershipType(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-[#F5A800] py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 text-center relative">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join 42,500+ students worldwide
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BE A CHANGE-MAKER
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join a community of passionate students using entrepreneurial action to improve lives and create a better, more sustainable world.
            </p>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#F5A800] font-semibold text-sm uppercase tracking-wider">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Why Join Enactus UFSQ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Become part of a global movement of young entrepreneurs creating positive change through innovation and action.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title} 
                  className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-14 h-14 bg-[#F5A800]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#F5A800] group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-7 h-7 text-[#F5A800] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#F5A800] font-semibold text-sm uppercase tracking-wider">How to Join</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Choose Your Path
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Whether you want to explore or dive into a specific role, there&apos;s a place for you in our team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {membershipTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    membershipType === type.id 
                      ? "ring-2 ring-[#F5A800] shadow-xl" 
                      : "hover:shadow-lg hover:border-[#F5A800]/30"
                  } ${type.highlight ? "border-[#F5A800]/30" : ""}`}
                  onClick={() => setMembershipType(type.id as "general" | "specific")}
                >
                  {type.highlight && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#F5A800] text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                        Recommended
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      membershipType === type.id ? "bg-[#F5A800]" : "bg-[#F5A800]/10"
                    }`}>
                      <type.icon className={`w-7 h-7 ${
                        membershipType === type.id ? "text-white" : "text-[#F5A800]"
                      }`} />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button 
                        variant={membershipType === type.id ? "default" : "outline"}
                        className={`w-full ${
                          membershipType === type.id 
                            ? "bg-[#F5A800] hover:bg-[#E09800] text-white" 
                            : "border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white"
                        }`}
                      >
                        {membershipType === type.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Available Positions Section - Only show if specific position selected */}
        {membershipType === "specific" && activePositions.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Available Positions
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Choose from our current openings based on your interests and skills.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {activePositions.map((position) => (
                  <Card 
                    key={position.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.positionId === position.id 
                        ? "ring-2 ring-[#F5A800] shadow-lg" 
                        : "hover:border-[#F5A800]/30"
                    }`}
                    onClick={() => setFormData({ ...formData, positionId: position.id })}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900">{position.title}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{position.department}</p>
                        </div>
                        <span className="px-3 py-1 text-xs bg-[#F5A800]/10 text-[#F5A800] rounded-full font-medium">
                          {position.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{position.description}</p>
                      <div className={`flex items-center gap-2 text-sm font-medium ${
                        formData.positionId === position.id ? "text-[#F5A800]" : "text-gray-400"
                      }`}>
                        {formData.positionId === position.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Selected
                          </>
                        ) : (
                          "Click to select"
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recruitment Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#F5A800] font-semibold text-sm uppercase tracking-wider">Process</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Recruitment Journey
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-36">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5A800] text-white flex items-center justify-center font-bold text-xl mb-3 shadow-lg shadow-[#F5A800]/25">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:flex items-center w-20 mx-2">
                      <div className="w-full h-[2px] bg-[#F5A800]/30" />
                      <ArrowRight className="w-4 h-4 text-[#F5A800] -ml-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#F5A800] font-semibold text-sm uppercase tracking-wider">Apply Now</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Start Your Journey
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Take the first step towards becoming a change-maker. Fill out the form below and our team will get back to you.
              </p>
            </div>

            {submitted ? (
              <div className="max-w-xl mx-auto">
                <Card className="bg-gradient-to-br from-[#F5A800]/5 to-[#F5A800]/10 border-[#F5A800]/20">
                  <CardContent className="p-10 text-center">
                    <div className="w-20 h-20 mx-auto bg-[#F5A800] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#F5A800]/25">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest in joining Enactus UFSQ. We will review your application and get back to you soon.
                    </p>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white"
                    >
                      Submit Another Application
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto shadow-xl border-0">
                <CardContent className="p-8">
                  {!membershipType ? (
                    <div className="text-center py-8">
                      <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Membership Type</h3>
                      <p className="text-gray-500 mb-6">
                        Please select whether you want to join as a general member or apply for a specific position above.
                      </p>
                      <Button
                        onClick={() => {
                          const element = document.querySelector('section:nth-of-type(3)')
                          element?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="bg-[#F5A800] hover:bg-[#E09800] text-white"
                      >
                        Choose Membership Type
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* Membership Type Badge */}
                      <div className="flex items-center justify-between mb-8 p-4 bg-[#F5A800]/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          {membershipType === "general" ? (
                            <Heart className="w-5 h-5 text-[#F5A800]" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-[#F5A800]" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {membershipType === "general" ? "General Member" : "Specific Position"}
                            </p>
                            {membershipType === "specific" && formData.positionId && (
                              <p className="text-sm text-gray-500">
                                {activePositions.find(p => p.id === formData.positionId)?.title}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setMembershipType(null)
                            setFormData({ ...formData, positionId: "" })
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Change
                        </Button>
                      </div>

                      <FieldGroup>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Enter your full name"
                              required
                              className="h-12"
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
                              className="h-12"
                            />
                          </Field>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field>
                            <FieldLabel htmlFor="studentNumber">Student Number</FieldLabel>
                            <Input
                              id="studentNumber"
                              value={formData.studentNumber}
                              onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                              placeholder="e.g., 2021012345"
                              required
                              className="h-12"
                            />
                          </Field>

                          <Field>
                            <FieldLabel htmlFor="yearOfStudy">Year of Study</FieldLabel>
                            <Select
                              value={formData.yearOfStudy}
                              onValueChange={(value) => setFormData({ ...formData, yearOfStudy: value })}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1st Year</SelectItem>
                                <SelectItem value="2">2nd Year</SelectItem>
                                <SelectItem value="3">3rd Year</SelectItem>
                                <SelectItem value="4">4th Year</SelectItem>
                                <SelectItem value="postgrad">Postgraduate</SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>
                        </div>

                        <Field>
                          <FieldLabel htmlFor="faculty">Faculty / School</FieldLabel>
                          <Input
                            id="faculty"
                            value={formData.faculty}
                            onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                            placeholder="e.g., Faculty of Economic and Management Sciences"
                            required
                            className="h-12"
                          />
                        </Field>

                        {membershipType === "specific" && (
                          <Field>
                            <FieldLabel htmlFor="position">Position</FieldLabel>
                            <Select
                              value={formData.positionId}
                              onValueChange={(value) => setFormData({ ...formData, positionId: value })}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select a position" />
                              </SelectTrigger>
                              <SelectContent>
                                {activePositions.map((position) => (
                                  <SelectItem key={position.id} value={position.id}>
                                    {position.title} - {position.department}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}

                        <Field>
                          <FieldLabel htmlFor="skills">Skills & Experience</FieldLabel>
                          <Textarea
                            id="skills"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="Tell us about your relevant skills, experience, and any extracurricular activities..."
                            rows={3}
                            className="resize-none"
                          />
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="motivation">Why do you want to join?</FieldLabel>
                          <Textarea
                            id="motivation"
                            value={formData.motivation}
                            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                            placeholder="Tell us why you want to join Enactus UFSQ and what you hope to achieve..."
                            rows={4}
                            required
                            className="resize-none"
                          />
                        </Field>

                        <Button
                          type="submit"
                          className="w-full bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold h-14 text-base rounded-xl shadow-lg shadow-[#F5A800]/25"
                          disabled={membershipType === "specific" && !formData.positionId}
                        >
                          SUBMIT APPLICATION
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </FieldGroup>
                    </form>
                  )}
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
