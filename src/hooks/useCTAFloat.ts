import { useEffect, useState } from 'react'

interface UseCTAFloatOptions {
  showAfterScrollPercent?: number
  hideBeforeEndPercent?: number
}

/**
 * Custom hook for floating CTA visibility based on scroll position
 * Shows CTA after user scrolls a certain percentage of the page
 */
export function useCTAFloat(options: UseCTAFloatOptions = {}) {
  const { 
    showAfterScrollPercent = 50, 
    hideBeforeEndPercent = 95 
  } = options
  
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage
      const scrollPercentage = (scrolled / (documentHeight - windowHeight)) * 100
      setScrollPercent(scrollPercentage)

      // Show CTA between specified percentages
      const shouldShow = 
        scrollPercentage >= showAfterScrollPercent && 
        scrollPercentage < hideBeforeEndPercent

      setIsVisible(shouldShow)
    }

    // Initial check
    handleScroll()

    // Listen to scroll events with throttle
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [showAfterScrollPercent, hideBeforeEndPercent])

  return { isVisible, scrollPercent }
}

/**
 * Hook for scroll direction detection
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

/**
 * Hook for scroll progress (0-100)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercentage = (scrolled / (documentHeight - windowHeight)) * 100
      
      setProgress(Math.min(100, Math.max(0, scrollPercentage)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
