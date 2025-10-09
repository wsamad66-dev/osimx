import { useEffect, useRef } from 'react'
import { useInView, useAnimation, Variants } from 'framer-motion'

interface UseScrollRevealOptions {
  threshold?: number
  once?: boolean
  delay?: number
}

/**
 * Custom hook for scroll-based reveal animations
 * Triggers animation when element enters viewport
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.2, once = true, delay = 0 } = options
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.55, 1]
      }
    }
  }

  return { ref, controls, variants, isInView }
}

/**
 * Variant for fade-up animation
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

/**
 * Variant for scale animation
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

/**
 * Variant for slide-left animation
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

/**
 * Variant for slide-right animation
 */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

/**
 * Stagger children animation
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
