"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/context/data-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const { getArticleBySlug } = useData()
  const slug = typeof params.slug === "string" ? params.slug : ""
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#333] mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you are looking for does not exist.</p>
            <Link href="/news">
              <Button className="bg-[#F5A800] hover:bg-[#E09800] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Cover Image */}
        <div className="relative w-full h-[40vh] md:h-[50vh]">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-[#F5A800] hover:bg-[#F5A800] text-white">
                {article.category}
              </Badge>
              <span className="text-gray-500">
                {article.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#333] mb-8">
              {article.title}
            </h1>

            {/* Body */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {article.body.split("\n").map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Back to News */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/news">
                <Button variant="outline" className="border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to News
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
