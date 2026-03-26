"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useData } from "@/context/data-context"
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  const { getLatestPublishedArticles } = useData()
  const [currentSlide, setCurrentSlide] = useState(0)
  const articles = getLatestPublishedArticles(3)

  useEffect(() => {
    if (articles.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [articles.length])

  if (articles.length === 0) {
    return (
      <section className="relative h-[500px] md:h-[600px] bg-gray-800 flex items-center justify-center">
        <p className="text-white text-xl">No articles available</p>
      </section>
    )
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.coverImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-[#F5A800] mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-white text-sm md:text-base mb-6 line-clamp-4 leading-relaxed">
                {article.excerpt}
              </p>
              <Link
                href={`/news/${article.id}`}
                className="inline-block bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold px-8 py-3 transition-colors"
              >
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-4 md:left-8 flex gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 transition-colors",
              index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
