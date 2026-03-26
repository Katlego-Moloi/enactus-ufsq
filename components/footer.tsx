import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/join-us", label: "Join Us" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10"
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
              <span className="text-2xl font-bold">
                enactus<span className="text-[#F5A800]">.</span>
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              University of the Free State - Qwaqwa Campus
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#F5A800] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F5A800] transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Enactus UFSQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
