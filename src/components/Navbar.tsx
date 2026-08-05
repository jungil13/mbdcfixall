'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Phone, Home, Settings, Folder, MessageSquare, Download, X, Star } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#blog' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      if (!isHomePage) return

      const sections = ['contact', 'blog', 'team', 'projects', 'services', 'about']
      let current = 'home'
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250) {
            current = sectionId
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href.startsWith('#')) {
      if (href === '#') {
        if (isHomePage) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          setLoading(true)
          router.push('/')
        }
        return
      }

      if (isHomePage) {
        try {
          const el = document.querySelector(href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        } catch {
          // Ignore invalid selector errors
        }
      } else {
        setLoading(true)
        router.push(`/${href}`)
      }
    } else {
      setLoading(true)
      router.push(href)
    }
  }

  const isSolid = scrolled || !isHomePage

  return (
    <>
      {/* Page loading bar */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E8A020] z-[9999] animate-[loadBar_1s_ease-in-out]" />
      )}

      {/* TOP HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isSolid ? 'bg-[#111111] shadow-[0_2px_20px_rgba(0,0,0,0.3)]' : 'bg-transparent'
        }`}
      >
        {/* Main Navbar */}
        <div className="max-w-[1280px] mx-auto px-5 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-[10px] no-underline"
          >
            <img src="/mightyb_logo.png" alt="MBDC FIX ALL logo" className="w-9 h-9 object-contain" />
            <div>
              <div className="font-barlow font-extrabold text-[20px] tracking-[0.04em] text-white leading-none">
                MBDC
              </div>
              <div className="font-dm text-[11px] tracking-[0.14em] leading-tight">
                <span className="text-[#E8A020]">FIX ALL</span>
                <span className="text-white/60 text-[9px] ml-1 hidden sm:inline">· HOME REPAIRS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-desktop-nav hidden lg:flex gap-10 items-center">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('#')
                ? isHomePage && activeSection === link.href.substring(1)
                : pathname === link.href
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-barlow font-semibold text-[15px] tracking-[0.1em] no-underline transition-colors duration-200 pb-[2px] border-b-2 ${
                    isActive
                      ? 'text-[#E8A020] border-[#E8A020]'
                      : 'text-white/85 border-transparent hover:text-[#E8A020] hover:border-[#E8A020]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0323422202"
              className="navbar-phone hidden lg:flex items-center gap-[6px] font-dm text-[14px] text-[#E8A020] no-underline"
            >
              <Phone size={14} />
              (032) 342 2202
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="font-barlow font-bold text-[14px] tracking-[0.12em] bg-[#E8A020] text-[#111111] px-5 py-[10px] no-underline transition-colors duration-200 hover:bg-[#F0B030] whitespace-nowrap"
            >
              INQUIRE NOW!
            </a>
          </div>
          
          {/* Mobile CTA (Phone Icon only) */}
          <div className="lg:hidden flex items-center">
             <a
              href="tel:0323422202"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E8A020]/20 text-[#E8A020]"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111111]/95 backdrop-blur-md border-t border-white/10 z-[100] pb-safe">
        <div className="flex items-center justify-around h-[64px]">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full no-underline transition-colors ${
              activeSection === 'home' ? 'text-[#E8A020]' : 'text-white/50 hover:text-[#E8A020]'
            }`}
          >
            <Home size={20} />
            <span className="font-dm text-[10px] font-medium tracking-wide">Home</span>
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, '#services')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full no-underline transition-colors ${
              activeSection === 'services' ? 'text-[#E8A020]' : 'text-white/50 hover:text-[#E8A020]'
            }`}
          >
            <Settings size={20} />
            <span className="font-dm text-[10px] font-medium tracking-wide">Services</span>
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full no-underline transition-colors ${
              activeSection === 'projects' ? 'text-[#E8A020]' : 'text-white/50 hover:text-[#E8A020]'
            }`}
          >
            <Folder size={20} />
            <span className="font-dm text-[10px] font-medium tracking-wide">Projects</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full no-underline transition-colors ${
              activeSection === 'contact' ? 'text-[#E8A020]' : 'text-white/50 hover:text-[#E8A020]'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-dm text-[10px] font-medium tracking-wide">Contact</span>
          </a>
        </div>
      </div>
    </>
  )
}
