'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export type GalleryItem = {
  id?: string
  title: string
  category: string
  description?: string | null
  image_url: string
  is_featured?: boolean
  created_at?: string
}

const defaultGallery: GalleryItem[] = [
  {
    title: 'Commercial Roof Leak Repair & Waterproofing',
    category: 'REPAIR',
    description: 'Complete elastomeric seal application and structural tile reinforcement in Cebu City.',
    image_url: '/repair.png',
  },
  {
    title: 'HVAC Chiller & Ducting Preventive Maintenance',
    category: 'MAINTENANCE',
    description: 'Quarterly overhaul and system diagnostics for commercial complex in Mandaue.',
    image_url: '/maintenance.png',
  },
  {
    title: 'Corporate Office Sanitation & Facility Upkeep',
    category: 'FACILITY',
    description: 'End-to-end janitorial management and deep disinfection for BPO facilities.',
    image_url: '/facility.png',
  },
  {
    title: 'Custom Residential Construction & Finishing',
    category: 'CONSTRUCTION',
    description: 'Modern two-storey residence built to precision engineering standards.',
    image_url: '/construction.jpg',
  },
  {
    title: 'Structural Foundation & Drainage Upgrades',
    category: 'CONSTRUCTION',
    description: 'Heavy reinforced concrete earthmoving and drainage installation in Consolacion.',
    image_url: '/infastructure.png',
  },
  {
    title: 'Interior Space Renovation & Facade Remodel',
    category: 'REPAIR',
    description: 'Full interior fit-out, acoustic ceiling panels, and modern tile layout.',
    image_url: '/renovation.png',
  },
]

const categories = [
  { label: 'All', value: 'ALL' },
  { label: 'Property Repair', value: 'REPAIR' },
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Facility Services', value: 'FACILITY' },
  { label: 'Construction', value: 'CONSTRUCTION' },
]

export function Gallery({ dynamicGallery }: { dynamicGallery?: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const items = dynamicGallery && dynamicGallery.length > 0 ? dynamicGallery : defaultGallery

  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter(item => (item.category || '').toUpperCase() === activeCategory)

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, filteredItems])

  const nextImage = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length)
  }

  const prevImage = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section id="gallery" className="py-24 bg-[#141414] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8A020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8A020]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <AnimatedSection variant="left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#E8A020]" />
              <span className="font-barlow font-bold text-[#E8A020] text-sm tracking-[0.2em] uppercase">
                OUR PORTFOLIO IN ACTION
              </span>
            </div>
            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              WORK &amp; PROJECT <span className="text-[#E8A020]">GALLERY</span>
            </h2>
            <p className="font-dm text-white/60 text-sm sm:text-base mt-2 max-w-xl">
              Explore our recent repair jobs, scheduled maintenance operations, and facility management services delivered across Cebu.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="right">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#E8A020] border border-white/15 hover:border-[#E8A020] text-white hover:text-[#111111] font-barlow font-bold text-xs sm:text-sm tracking-[0.14em] px-6 py-3 transition-all duration-300 group no-underline self-start md:self-auto"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Filter Tabs */}
        <AnimatedSection variant="up">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map(cat => {
              const active = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`font-barlow font-bold text-xs sm:text-sm tracking-[0.12em] px-5 py-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap uppercase ${
                    active
                      ? 'bg-[#E8A020] text-[#111111] shadow-lg shadow-[#E8A020]/20'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item, idx) => (
            <AnimatedSection key={item.id || idx} variant="up" delay={idx * 80}>
              <div 
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative h-[300px] sm:h-[320px] rounded-none overflow-hidden bg-[#1f1f1f] border border-white/10 cursor-pointer transition-all duration-300 hover:border-[#E8A020]/60 hover:shadow-xl hover:shadow-[#E8A020]/10"
              >
                {/* Image */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#111111]/85 backdrop-blur-md border border-[#E8A020]/40 text-[#E8A020] text-[10px] font-barlow font-bold tracking-[0.15em] px-2.5 py-1 uppercase">
                    <Tag size={10} />
                    {item.category || 'PROJECT'}
                  </span>
                </div>

                {/* Expand Icon on Hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-[#E8A020] text-[#111111] flex items-center justify-center shadow-lg">
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-barlow font-bold text-lg sm:text-xl text-white group-hover:text-[#E8A020] transition-colors leading-tight mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-dm text-xs text-white/70 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-white/10 bg-white/5">
            <ImageIcon className="w-12 h-12 text-[#E8A020]/50 mx-auto mb-3" />
            <p className="text-white/70 font-barlow font-bold tracking-wider">No photos found in this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox / Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-[#E8A020] hover:text-black p-2.5 rounded-full transition-all cursor-pointer z-50"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-[#E8A020] hover:text-black p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-[#E8A020] hover:text-black p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[selectedImageIndex].image_url}
              alt={filteredItems[selectedImageIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-none border border-white/20 shadow-2xl"
            />
            
            {/* Caption Bar */}
            <div className="w-full bg-[#111111]/90 border border-white/15 p-4 mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#E8A020] text-[#111111] text-[10px] font-barlow font-bold px-2 py-0.5 tracking-wider uppercase">
                    {filteredItems[selectedImageIndex].category}
                  </span>
                  <span className="text-white/40 text-xs font-dm">
                    {selectedImageIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <h4 className="font-barlow font-bold text-white text-base sm:text-lg">
                  {filteredItems[selectedImageIndex].title}
                </h4>
                {filteredItems[selectedImageIndex].description && (
                  <p className="font-dm text-xs text-white/70 mt-1 max-w-2xl">
                    {filteredItems[selectedImageIndex].description}
                  </p>
                )}
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedImageIndex(null)}
                className="bg-[#E8A020] hover:bg-[#F0B030] text-[#111111] font-barlow font-bold text-xs tracking-wider px-4 py-2 uppercase whitespace-nowrap transition-colors"
              >
                Inquire About This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
