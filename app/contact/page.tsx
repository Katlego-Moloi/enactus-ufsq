"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Mail, MapPin, Instagram, Linkedin, Facebook, Check } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the message
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-[#F5A800] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              GET IN TOUCH
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Have questions or want to learn more about Enactus UFSQ? We would love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-[#333] mb-6">Send Us a Message</h2>
                
                {submitted ? (
                  <Card className="bg-[#F5A800]/10 border-[#F5A800]">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto bg-[#F5A800] rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#333] mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-4">
                        Thanks! We&apos;ll be in touch soon.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white"
                      >
                        Send Another Message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit}>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your name"
                              required
                            />
                          </Field>

                          <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
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
                            <FieldLabel htmlFor="subject">Subject</FieldLabel>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="What is this about?"
                              required
                            />
                          </Field>

                          <Field>
                            <FieldLabel htmlFor="message">Message</FieldLabel>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Your message..."
                              rows={5}
                              required
                            />
                          </Field>

                          <Button
                            type="submit"
                            className="w-full bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold py-3"
                          >
                            SEND MESSAGE
                          </Button>
                        </FieldGroup>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-[#333] mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F5A800]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#F5A800]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333]">Email</h3>
                      <a href="mailto:enactus@ufs.ac.za" className="text-gray-600 hover:text-[#F5A800]">
                        enactus@ufs.ac.za
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F5A800]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#F5A800]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333]">Address</h3>
                      <p className="text-gray-600">
                        University of the Free State<br />
                        QwaQwa Campus<br />
                        Private Bag X13<br />
                        Phuthaditjhaba, 9866<br />
                        South Africa
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-[#333] mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://instagram.com/enactusufsq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/company/enactusufsq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://facebook.com/enactusufsq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-[#f5f5f5]">
          <div className="container mx-auto px-4 py-8">
            <div className="aspect-video md:aspect-[21/9] bg-gray-300 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">University of the Free State - QwaQwa Campus</p>
                  <p className="text-sm">Phuthaditjhaba, Free State, South Africa</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
