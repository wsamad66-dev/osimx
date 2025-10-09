'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Show tooltip on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('whatsapp-tooltip-seen')
    if (!hasSeenTooltip && isVisible) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowTooltip(false)
          localStorage.setItem('whatsapp-tooltip-seen', 'true')
        }, 5000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (include country code without + or 00)
    const phoneNumber = '237xxxxxxxxx' // Example: Cameroon number
    const message = encodeURIComponent(
      'Bonjour, je souhaite obtenir des informations sur vos services d\'accompagnement pour étudier à l\'étranger.'
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  if (!isVisible) return null

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Tooltip */}
        {showTooltip && (
          <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-xs animate-in slide-in-from-right">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
            <div className="flex items-start gap-3">
              <div className="bg-[#2ECC71] p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-poppins font-semibold text-gray-900 text-sm mb-1">
                  Besoin d&apos;aide ?
                </p>
                <p className="text-xs text-gray-600 font-inter">
                  Discutez avec nous sur WhatsApp pour une réponse rapide !
                </p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -right-2 bottom-4 w-3 h-3 bg-white transform rotate-45"></div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>

          {/* Icon */}
          <MessageCircle className="relative w-7 h-7" />

          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </>
  )
}
