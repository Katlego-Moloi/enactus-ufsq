"use client"

import Link from "next/link"
import { useData } from "@/context/data-context"
import { Card, CardContent } from "@/components/ui/card"

export function LatestNews() {
  const { getLatestPublishedArticles } = useData()
  const articles = getLatestPublishedArticles(3)

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
          LATEST NEWS
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-[#F5A800] font-semibold mb-2">
                  {article.category}
                </p>
                <h3 className="font-bold text-[#333] mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {article.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.id}`}
                  className="text-[#F5A800] hover:text-[#E09800] text-sm font-semibold transition-colors"
                >
                  Read More &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-block border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white font-semibold px-8 py-3 transition-colors"
          >
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  )
}
