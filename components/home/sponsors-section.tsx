"use client"

import Link from "next/link"
import { useData } from "@/context/data-context"

export function SponsorsSection() {
  const { getActiveSponsors } = useData()
  const sponsors = getActiveSponsors()

  return (
    <section className="py-16 md:py-20 bg-[#e8e8e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-12">
          OUR SPONSORS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {sponsors.map((sponsor) => (
            <Link key={sponsor.id} href="/sponsors" className="group">
              <div className="flex flex-col items-center">
                <div className="w-32 h-24 bg-white rounded-lg flex items-center justify-center p-4 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  {sponsor.name === "Harmony Gold Mining" && (
                    <div className="text-center">
                      <span className="text-lg font-bold text-[#1a1a1a] italic">HARMONY</span>
                    </div>
                  )}
                  {sponsor.name === "MTN" && (
                    <div className="w-16 h-16 bg-[#FFCC00] rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-[#1a1a1a]">MTN</span>
                    </div>
                  )}
                  {sponsor.name === "Ford" && (
                    <div className="text-center">
                      <span className="text-lg font-bold text-[#1a1a1a] italic">Ford</span>
                      <p className="text-[8px] text-gray-500">Ford Motor Company Fund</p>
                    </div>
                  )}
                  {sponsor.name === "AVI" && (
                    <div className="text-center">
                      <span className="text-2xl font-bold text-[#1a1a1a]">AVI</span>
                      <p className="text-[8px] text-gray-500">GROWING GREAT BRANDS</p>
                    </div>
                  )}
                  {!["Harmony Gold Mining", "MTN", "Ford", "AVI"].includes(sponsor.name) && (
                    <div className="text-center">
                      <span className="text-lg font-bold text-[#1a1a1a]">{sponsor.name}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#333] text-center tracking-wide group-hover:text-[#F5A800] transition-colors">
                  {sponsor.name.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sponsors"
            className="inline-block bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold px-8 py-3 transition-colors"
          >
            VIEW ALL SPONSORS
          </Link>
        </div>
      </div>
    </section>
  )
}
