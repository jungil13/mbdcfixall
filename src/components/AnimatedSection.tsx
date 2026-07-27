'use client'
import { useEffect, useRef, useState } from 'react'

type AnimationVariant = 'up' | 'left' | 'right' | 'scale'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: AnimationVariant
}

const variantClass: Record<AnimationVariant, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

export function AnimatedSection({ children, className = '', delay = 0, variant = 'up' }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Unobserve once it's visible so it doesn't animate out and in repeatedly
          if (domRef.current) observer.unobserve(domRef.current)
        }
      })
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    })

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const base = variantClass[variant]

  return (
    <div
      ref={domRef}
      className={`${base} ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
