import { useEffect, useState, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface UseAnimatedCounterOptions {
  end: number
  duration?: number
  delay?: number
  enableOnView?: boolean
}

/**
 * Custom hook for animated number counting
 * Smoothly animates from 0 to target value when in viewport
 */
export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const { end, delay = 0, enableOnView = true } = options
  
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasStarted, setHasStarted] = useState(false)
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  })
  
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if ((enableOnView && isInView && !hasStarted) || (!enableOnView && !hasStarted)) {
      setHasStarted(true)
      
      const timeout = setTimeout(() => {
        motionValue.set(end)
      }, delay)
      
      return () => clearTimeout(timeout)
    }
  }, [isInView, enableOnView, hasStarted, end, delay, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest))
    })

    return () => unsubscribe()
  }, [springValue])

  return { ref, displayValue, isInView }
}

/**
 * Format counter value with suffix
 */
export function formatCounterValue(value: number, suffix?: string, prefix?: string): string {
  const formatted = value.toLocaleString('fr-FR')
  return `${prefix || ''}${formatted}${suffix || ''}`
}

/**
 * Hook for percentage counter
 */
export function usePercentageCounter(
  end: number,
  duration?: number,
  delay?: number
) {
  const counter = useAnimatedCounter({ end, duration, delay })
  
  return {
    ...counter,
    formattedValue: `${counter.displayValue}%`
  }
}

/**
 * Hook for number counter with + suffix
 */
export function usePlusCounter(
  end: number,
  duration?: number,
  delay?: number
) {
  const counter = useAnimatedCounter({ end, duration, delay })
  
  return {
    ...counter,
    formattedValue: `${counter.displayValue.toLocaleString('fr-FR')}+`
  }
}
