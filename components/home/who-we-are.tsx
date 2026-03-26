import Link from "next/link"

export function WhoWeAre() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-6">
          WHO WE ARE
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
          Welcome to Enactus UFSQQ, a vibrant community of change-makers committed to making a positive impact on the world around us. As students from the University of the Free State QwaQwa Campus, we are proud members of the Enactus team, a collective driven by innovation, passion, and a shared vision for social transformation. Our mission goes beyond the boundaries of classrooms and textbooks; we are dedicated to improving our local community and the world at large. However, our impact extends far beyond these specific initiatives. With a diverse array of enterprise teams, each tackling unique challenges, we strive to address pressing issues and create lasting change. We invite you to explore the stories, projects, and initiatives that define who we are and what we stand for. Join us on this journey of innovation, collaboration, and making a meaningful difference in the lives of those we serve.
        </p>
        <Link
          href="/contact"
          className="inline-block border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-white font-semibold px-8 py-3 transition-colors"
        >
          TALK TO OUR TEAM
        </Link>
      </div>
    </section>
  )
}
