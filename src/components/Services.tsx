'use client'
import { useState } from 'react'
import { Building2, Home, HardHat, Wrench, Hammer, Settings, Shield, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

type ServiceCategory = 'SERVICES' | 'CONSTRUCTION'

const constructionServices = [
  {
    icon: Home,
    title: 'Residential Construction',
    description:
      'Custom single-family homes, townhouses, and condominiums built to your exact specifications — from foundation to finishing.',
    items: ['Custom Home Building', 'Townhouse Development', 'House Renovation', 'Interior Fit-Out'],
    image: 'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=700&h=450&fit=crop&auto=format',
  },
  {
    icon: Building2,
    title: 'Commercial Buildings',
    description:
      'Office towers, retail centers, hotels, and mixed-use developments engineered for durability, aesthetics, and ROI.',
    items: ['Office Buildings', 'Retail & Commercial', 'Hotels & Hospitality', 'Mixed-Use Complexes'],
    image: 'https://images.unsplash.com/photo-1621831337128-35676ca30868?w=700&h=450&fit=crop&auto=format',
  },
  {
    icon: HardHat,
    title: 'Infrastructure Projects',
    description:
      'Roads, bridges, drainage systems, and public works delivered to DPWH standards with efficiency and precision.',
    items: ['Road & Pavement Works', 'Bridge Construction', 'Drainage Systems', 'Earthmoving & Grading'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&h=450&fit=crop&auto=format',
  },
  {
    icon: Wrench,
    title: 'Renovation & Remodeling',
    description:
      'Breathe new life into existing structures with our expert renovation team — on schedule, within budget.',
    items: ['Commercial Renovation', 'Structural Retrofitting', 'Facade Upgrades', 'Space Reconfiguration'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=450&fit=crop&auto=format',
  },
]

const facilityServices = [
  {
    icon: Hammer,
    title: 'Property Repair',
    description:
      'Fast, reliable repair solutions for residential and commercial properties — structural fixes, plumbing, electrical, flooring, and more. We respond quickly to minimize disruption.',
    items: ['Structural Repairs', 'Plumbing & Electrical', 'Flooring & Tiling', 'Roofing Repairs'],
    image: 'https://toplissolutions.com/wp-content/uploads/2024/07/tsi-rectification-hero-image-scaled.webp',
  },
  {
    icon: Settings,
    title: 'Maintenance Programs',
    description:
      'Comprehensive preventive and corrective maintenance programs that extend asset life, reduce costs, and keep your property performing at its best year-round.',
    items: ['Scheduled PM Programs', 'HVAC Maintenance', 'Building Systems Upkeep', 'Emergency Response'],
    image: 'https://completemaintenanceexperts.com.au/wp-content/uploads/2024/11/restorations-services-sydney.webp',
  },
  {
    icon: Shield,
    title: 'Facility Services',
    description:
      'End-to-end facility management for commercial and industrial properties — janitorial, landscaping, security coordination, and pest control under one trusted partner.',
    items: ['Janitorial & Sanitation', 'Landscaping & Grounds', 'Security & Access Control', 'Pest Management'],
    image: 'https://silagroup.co.in/wp-content/uploads/2023/06/fm-gallery-13-min.jpg',
  },
]

type Service = {
  icon?: any
  title: string
  description: string
  items: string[]
  image?: string
  image_url?: string
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon || Building2
  const imageUrl = service.image_url || service.image || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=450&fit=crop&auto=format'

  return (
    <AnimatedSection delay={index * 100} variant="up">
      <div
        className="service-card-wrapper"
        style={{
          background: '#181818',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Image with subtle gradient */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(180px, 22vw, 220px)' }}>
          <img
            src={imageUrl}
            alt={service.title}
            className="service-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #181818 0%, rgba(24,24,24,0.4) 60%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(232, 160, 32, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            }}
          >
            <Icon size={22} color="#111111" />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              color: '#FFFFFF',
              margin: '0 0 0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.65)',
              margin: '0 0 1.5rem',
              fontWeight: 300,
              flex: 1,
            }}
          >
            {service.description}
          </p>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
              }}
            >
              {service.items && service.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12.5px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2 size={14} color="#E8A020" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function Services({ dynamicServices }: { dynamicServices?: any[] }) {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('SERVICES')

  const useDynamic = dynamicServices && dynamicServices.length > 0
  
  let currentServices: any[] = []
  if (useDynamic) {
    currentServices = dynamicServices!.filter(s => s.category === activeTab)
    if (currentServices.length === 0) currentServices = dynamicServices!
  } else {
    currentServices = activeTab === 'SERVICES' ? facilityServices : constructionServices
  }

  return (
    <section
      id="services"
      className="section-padded"
      style={{
        background: '#111111',
        padding: '7rem 1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <AnimatedSection>
          <div style={{ marginBottom: '3rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  color: '#E8A020',
                  fontWeight: 600,
                }}
              >
                WHAT WE OFFER
              </span>
            </div>
            <div
              className="services-header-flex"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                REPAIR & <span style={{ color: '#E8A020' }}>MAINTENANCE</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '420px',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Cebu&apos;s primary specialists in property repairs, preventive maintenance programs, and full commercial facility management.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={100}>
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              background: '#1C1C1C',
              padding: '6px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '2.5rem',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {(
              [
                { key: 'SERVICES', label: 'REPAIR & MAINTENANCE' },
                { key: 'CONSTRUCTION', label: 'CONSTRUCTION' },
              ] as { key: ServiceCategory; label: string }[]
            ).map(({ key: tab, label }) => (
              <button
                key={tab}
                id={`services-tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(13px, 2.2vw, 15px)',
                  letterSpacing: '0.1em',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeTab === tab ? '#E8A020' : 'transparent',
                  color: activeTab === tab ? '#111111' : 'rgba(255, 255, 255, 0.6)',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
          }}
          className="services-grid"
        >
          {currentServices.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .service-card-wrapper:hover {
          border-color: rgba(232, 160, 32, 0.5) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
        }
        .service-card-wrapper:hover .service-img {
          transform: scale(1.06);
        }
      `}} />
    </section>
  )
}
