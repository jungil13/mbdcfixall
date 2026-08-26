'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Tag, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { GalleryItem } from '@/components/Gallery'

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
  { label: 'All Photos', value: 'ALL' },
  { label: 'Property Repair', value: 'REPAIR' },
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Facility Services', value: 'FACILITY' },
  { label: 'Construction', value: 'CONSTRUCTION' },
  { label: 'Before & After', value: 'BEFORE_AFTER' },
]

export function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const items = initialItems && initialItems.length > 0 ? initialItems : defaultGallery

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchCat = activeCategory === 'ALL' || (item.category || '').toUpperCase() === activeCategory
      const matchSearch = search.trim() === '' || 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [items, activeCategory, search])

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
    <div className="max-w-[1280px] mx-auto px-5">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <AnimatedSection variant="fade">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#E8A020]" />
            <span className="font-barlow font-bold text-[#E8A020] text-xs sm:text-sm tracking-[0.2em] uppercase">
              VISUAL SHOWCASE
            </span>
            <div className="w-8 h-[2px] bg-[#E8A020]" />
          </div>
          <h1 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase mb-4">
            PROJECT &amp; WORK <span className="text-[#E8A020]">GALLERY</span>
          </h1>
          <p className="font-dm text-white/70 text-sm sm:text-base leading-relaxed">
            Browse through our portfolio of on-site repairs, preventive maintenance tasks, and full facility management projects completed throughout Cebu.
          </p>
        </AnimatedSection>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map(cat => {
            const active = activeCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`font-barlow font-bold text-xs sm:text-sm tracking-[0.12em] px-4 py-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap uppercase ${
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

        {/* Search Bar */}
        <div className="relative min-w-[240px] md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search photos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-white/15 text-white text-sm pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#E8A020] font-dm transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredItems.map((item, idx) => (
          <AnimatedSection key={item.id || idx} variant="fade" delay={(idx % 6) * 0.05}>
            <div 
              onClick={() => setSelectedImageIndex(idx)}
              className="group relative h-[320px] sm:h-[350px] overflow-hidden bg-[#1a1a1a] border border-white/10 cursor-pointer transition-all duration-300 hover:border-[#E8A020]/60 hover:shadow-2xl hover:shadow-[#E8A020]/15"
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

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <div className="w-9 h-9 rounded-full bg-[#E8A020] text-[#111111] flex items-center justify-center shadow-lg">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* Bottom Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-barlow font-bold text-lg sm:text-xl text-white group-hover:text-[#E8A020] transition-colors leading-snug mb-1.5">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="font-dm text-xs text-white/70 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 border border-white/10 bg-white/5 my-8">
          <ImageIcon className="w-16 h-16 text-[#E8A020]/40 mx-auto mb-4" />
          <h3 className="text-white font-barlow font-bold text-xl uppercase mb-1">No Photos Found</h3>
          <p className="text-white/60 font-dm text-sm">Try clearing your search query or selecting a different category tab.</p>
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="bg-gradient-to-r from-[#E8A020]/20 via-[#1f1f1f] to-[#141414] border border-[#E8A020]/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-[#E8A020] font-barlow font-bold text-xs tracking-[0.2em] uppercase mb-2">READY TO START?</div>
          <h3 className="font-barlow font-black text-2xl sm:text-3xl text-white uppercase">Need Similar Work Done on Your Property?</h3>
          <p className="font-dm text-white/70 text-sm mt-1 max-w-xl">Get in touch with our specialist team for a free site assessment and transparent quotation.</p>
        </div>
        <a
          href="/#contact"
          className="bg-[#E8A020] hover:bg-[#F0B030] text-[#111111] font-barlow font-bold text-sm tracking-[0.14em] px-8 py-4 uppercase whitespace-nowrap transition-all duration-200 shadow-xl shadow-[#E8A020]/20 no-underline inline-flex items-center gap-2 self-start md:self-auto"
        >
          <span>REQUEST A FREE QUOTE</span>
          <ArrowRight size={16} />
        </a>
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
            <div className="w-full bg-[#111111]/95 border border-white/15 p-4 mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
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
                href="/#contact"
                onClick={() => setSelectedImageIndex(null)}
                className="bg-[#E8A020] hover:bg-[#F0B030] text-[#111111] font-barlow font-bold text-xs tracking-wider px-5 py-2.5 uppercase whitespace-nowrap transition-colors"
              >
                Inquire About This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
