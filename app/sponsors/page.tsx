"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"

export default function SponsorsPage() {
  const { getActiveSponsors } = useData()
  const sponsors = getActiveSponsors()

  // Group sponsors by tier
  const platinumSponsors = sponsors.filter((s) => s.tier === "Platinum")
  const goldSponsors = sponsors.filter((s) => s.tier === "Gold")
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver")

  const renderSponsorLogo = (name: string) => {
    if (name === "Harmony Gold Mining") {
      return (
        <div className="text-center">
          <span className="text-xl font-bold text-[#1a1a1a] italic">HARMONY</span>
        </div>
      )
    }
    if (name === "MTN") {
      return (
        <div className="w-20 h-20 bg-[#FFCC00] rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-[#1a1a1a]">MTN</span>
        </div>
      )
    }
    if (name === "Ford") {
      return (
        <div className="text-center">
          <span className="text-xl font-bold text-[#1a1a1a] italic">Ford</span>
          <p className="text-xs text-gray-500">Ford Motor Company Fund</p>
        </div>
      )
    }
    if (name === "AVI") {
      return (
        <div className="text-center">
          <span className="text-3xl font-bold text-[#1a1a1a]">AVI</span>
          <p className="text-xs text-gray-500">GROWING GREAT BRANDS</p>
        </div>
      )
    }
    return (
      <div className="text-center">
        <span className="text-xl font-bold text-[#1a1a1a]">{name}</span>
      </div>
    )
  }

  const SponsorCard = ({ sponsor }: { sponsor: typeof sponsors[0] }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="w-32 h-24 flex items-center justify-center mb-4">
        {renderSponsorLogo(sponsor.name)}
      </div>
      <h3 className="font-semibold text-lg text-[#333] mb-2">{sponsor.name}</h3>
      <p className="text-sm text-gray-600">{sponsor.description}</p>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-[#F5A800] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              OUR SPONSORS
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              We are grateful to our generous sponsors who believe in our mission and support our journey to create positive change through entrepreneurial action.
            </p>
          </div>
        </section>

        {/* Sponsors Grid */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            {/* Platinum Sponsors */}
            {platinumSponsors.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#333] text-center mb-8 flex items-center justify-center gap-3">
                  <span className="w-16 h-[2px] bg-gray-300" />
                  PLATINUM SPONSORS
                  <span className="w-16 h-[2px] bg-gray-300" />
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {platinumSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            )}

            {/* Gold Sponsors */}
            {goldSponsors.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#333] text-center mb-8 flex items-center justify-center gap-3">
                  <span className="w-16 h-[2px] bg-[#F5A800]" />
                  GOLD SPONSORS
                  <span className="w-16 h-[2px] bg-[#F5A800]" />
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {goldSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            )}

            {/* Silver Sponsors */}
            {silverSponsors.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#333] text-center mb-8 flex items-center justify-center gap-3">
                  <span className="w-16 h-[2px] bg-gray-400" />
                  SILVER SPONSORS
                  <span className="w-16 h-[2px] bg-gray-400" />
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {silverSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            )}

            {sponsors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No sponsors listed at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Become a Sponsor CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-4">
              BECOME A SPONSOR
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Partner with Enactus UFSQ and invest in the next generation of social entrepreneurs. Your support helps us create lasting positive impact in communities across South Africa.
            </p>
            <Link href="/contact">
              <Button className="bg-[#F5A800] hover:bg-[#E09800] text-white font-semibold px-8 py-3 text-lg">
                GET IN TOUCH
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
