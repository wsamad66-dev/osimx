'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: Array<{
    title: string
    description: string
  }>
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />
        
        {/* Active progress line */}
        <motion.div
          className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#26a5de] to-[#232d6e] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isPending = stepNumber > currentStep

            return (
              <div key={stepNumber} className="flex flex-col items-center" style={{ width: `${100 / totalSteps}%` }}>
                {/* Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? '#26a5de'
                      : isCurrent
                      ? '#232d6e'
                      : '#e5e7eb',
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                    isCompleted && 'border-[#26a5de] bg-[#26a5de]',
                    isCurrent && 'border-[#232d6e] bg-[#232d6e] shadow-lg',
                    isPending && 'border-gray-300 bg-white'
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-bold transition-colors duration-300',
                        isCurrent && 'text-white',
                        isPending && 'text-gray-400'
                      )}
                    >
                      {stepNumber}
                    </span>
                  )}
                </motion.div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <motion.p
                    initial={false}
                    animate={{
                      color: isCurrent ? '#232d6e' : isCompleted ? '#26a5de' : '#9ca3af',
                      fontWeight: isCurrent ? 600 : 500,
                    }}
                    className="text-xs sm:text-sm whitespace-nowrap"
                  >
                    {step.title}
                  </motion.p>
                  {isCurrent && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-gray-500 mt-1 hidden sm:block"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
