"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/sponsors", label: "SPONSORS" },
  { href: "/join-us", label: "JOIN US" },
  { href: "/about", label: "ABOUT US" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-stretch h-16 md:h-20">
      {/* Logo Box */}
      <div className="flex items-center justify-center bg-white px-4 md:px-6 min-w-[140px] md:min-w-[200px]">
        <Link href="/" className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 md:w-10 md:h-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5L35 20L20 35L5 20L20 5Z"
                fill="#F5A800"
              />
              <path
                d="M20 10L30 20L20 30L10 20L20 10Z"
                fill="#F5A800"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            <span className="text-xl md:text-2xl font-bold text-[#333]">
              enactus<span className="text-[#F5A800]">.</span>
            </span>
          </div>
          <span className="text-[8px] md:text-[10px] text-gray-600 leading-tight">
            University of the Free State<br />
            Qwaqwa Campus
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 bg-[#F5A800] items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-6 py-2 text-sm font-semibold text-white transition-colors h-full flex items-center",
                isActive ? "bg-[#C98600]" : "hover:bg-[#E09800]"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden flex-1 bg-[#F5A800] items-center justify-end px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#F5A800] md:hidden flex flex-col shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-6 py-3 text-sm font-semibold text-white transition-colors border-b border-[#E09800]",
                  isActive ? "bg-[#C98600]" : "hover:bg-[#E09800]"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
