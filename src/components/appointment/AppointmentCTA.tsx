'use client'

import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface AppointmentCTAProps {
  /** Text to display on the button */
  text?: string
  /** Variant style */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Optional className */
  className?: string
  /** If true, scrolls to appointment section on current page */
  scrollTo?: string
  /** If provided, navigates to this URL instead of scrolling */
  href?: string
}

export function AppointmentCTA({
  text = 'Prendre rendez-vous maintenant',
  variant = 'primary',
  size = 'md',
  className = '',
  scrollTo,
  href = '/rendez-vous',
}: AppointmentCTAProps) {
  const router = useRouter()

  const handleClick = () => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      router.push(href)
    }
  }

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500',
    secondary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-400 hover:to-pink-400',
    outline: 'border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={text}
    >
      <Calendar className={iconSizes[size]} />
      <span>{text}</span>
    </motion.button>
  )
}
