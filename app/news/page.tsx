"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Competitions", "Projects", "Team News"]

export default function NewsPage() {
  const { getPublishedArticles } = useData()
  const articles = getPublishedArticles()
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  const featuredArticle = filteredArticles[0]
  const otherArticles = filteredArticles.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-[#F5A800] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              NEWS & UPDATES
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Stay up to date with the latest news, achievements, and stories from Enactus UFSQ.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <Link href={`/news/${featuredArticle.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3 relative aspect-video lg:aspect-auto lg:min-h-[400px]">
                      <Image
                        src={featuredArticle.coverImageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="lg:w-1/3 p-6 lg:p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-[#F5A800] hover:bg-[#F5A800] text-white">
                        {featuredArticle.category}
                      </Badge>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#333] mb-3">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        {featuredArticle.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                      <Button className="w-fit bg-[#F5A800] hover:bg-[#E09800] text-white">
                        READ MORE
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-[#F5A800] text-white"
                      : "bg-white text-[#333] hover:bg-[#F5A800]/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            {otherArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src={article.coverImageUrl}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-[#F5A800] hover:bg-[#F5A800] text-white">
                          {article.category}
                        </Badge>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg text-[#333] mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {article.createdAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>
                        <span className="text-[#F5A800] font-medium text-sm hover:underline">
                          Read More
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {activeCategory === "All"
                    ? "No articles published yet."
                    : `No articles in the "${activeCategory}" category.`}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
