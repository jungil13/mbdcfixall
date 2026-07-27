'use client'
import { useState } from 'react'
import { Building2, Home, HardHat, Wrench, Hammer, Settings, Shield } from 'lucide-react'

type ServiceCategory = 'CONSTRUCTION' | 'SERVICES'

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
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=700&h=450&fit=crop&auto=format',
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description:
      'Comprehensive preventive and corrective maintenance programs that extend asset life, reduce costs, and keep your property performing at its best year-round.',
    items: ['Scheduled PM Programs', 'HVAC Maintenance', 'Building Systems Upkeep', 'Emergency Response'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=450&fit=crop&auto=format',
  },
  {
    icon: Shield,
    title: 'Facility Services',
    description:
      'End-to-end facility management for commercial and industrial properties — janitorial, landscaping, security coordination, and pest control under one trusted partner.',
    items: ['Janitorial & Sanitation', 'Landscaping & Grounds', 'Security & Access Control', 'Pest Management'],
    image: 'https://images.unsplash.com/photo-1527515637462-cff94ebb7592?w=700&h=450&fit=crop&auto=format',
  },
]

type Service = {
  icon: any
  title: string
  description: string
  items: string[]
  image: string
  image_url?: string
}

function ServiceCard({ service }: { service: Service }) {
  // Map icon_name strings to Lucide components if needed, or fallback
  const Icon = service.icon || Building2
  const imageUrl = service.image_url || service.image

  return (
    <div
      style={{
        background: '#FFFFFF',
        overflow: 'hidden',
        transition: 'transform 0.2s',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={imageUrl}
          alt={service.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            display: 'block',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              background: '#E8A020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={20} color="#111111" />
          </div>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '22px',
              color: '#111111',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {service.title}
          </h3>
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#6B6B6B',
            margin: '0 0 1.25rem',
            fontWeight: 300,
          }}
        >
          {service.description}
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {service.items.map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                color: '#444444',
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '2px',
                  background: '#E8A020',
                  flexShrink: 0,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Services({ dynamicServices }: { dynamicServices?: any[] }) {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('CONSTRUCTION')

  // Use dynamic services if available, else fallback to hardcoded
  const useDynamic = dynamicServices && dynamicServices.length > 0
  
  let currentServices = []
  if (useDynamic) {
    currentServices = dynamicServices.filter(s => s.category === activeTab)
  } else {
    currentServices = activeTab === 'CONSTRUCTION' ? constructionServices : facilityServices
  }

  return (
    <section
      id="services"
      style={{
        background: '#F7F4EE',
        padding: '7rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
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
                fontWeight: 500,
              }}
            >
              WHAT WE OFFER
            </span>
          </div>
          <div
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
                fontSize: 'clamp(36px, 4vw, 54px)',
                lineHeight: 1.05,
                color: '#111111',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              OUR CORE
              <br />
              <span style={{ color: '#E8A020' }}>SERVICES</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#6B6B6B',
                maxWidth: '380px',
                margin: 0,
                fontWeight: 300,
              }}
            >
              From residential homes to large-scale infrastructure — and now
              including property repair, maintenance, and facility management.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            gap: '2px',
            background: '#D8D4CC',
            marginBottom: '2px',
            width: 'fit-content',
          }}
        >
          {(['CONSTRUCTION', 'SERVICES'] as ServiceCategory[]).map((tab) => (
            <button
              key={tab}
              id={`services-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.12em',
                padding: '13px 28px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                background: activeTab === tab ? '#E8A020' : '#FFFFFF',
                color: activeTab === tab ? '#111111' : '#6B6B6B',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2px',
            background: '#D8D4CC',
          }}
          className="services-grid"
        >
          {currentServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
