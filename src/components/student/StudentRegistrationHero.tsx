'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Users, 
  Globe,
  Sparkles,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';
import StudentRegistrationForm from '@/components/student/StudentRegistrationForm';

// Brand colors
const BRAND_COLORS = {
  primary: '#26a5de',    // Blue
  secondary: '#232d6e',  // Navy
  accent: '#f29100',     // Orange
  white: '#ffffff',
};

interface TrustIndicator {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Confidential',
    description: 'Your documents are encrypted and protected',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Quick Registration',
    description: 'Complete your profile in under 5 minutes',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Verified Process',
    description: 'Trusted by 10,000+ students worldwide',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Support',
    description: '24/7 guidance from education specialists',
  },
];

const successStories = [
  {
    name: 'Aminata D.',
    country: 'Senegal',
    destination: 'France',
    message: 'Registration was so simple! Got accepted in 2 weeks.',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
  {
    name: 'Kwame O.',
    country: 'Ghana',
    destination: 'Canada',
    message: 'The document upload made everything easy. Highly recommend!',
    avatar: 'https://i.pravatar.cc/100?img=33',
  },
  {
    name: 'Fatima M.',
    country: 'Morocco',
    destination: 'UK',
    message: 'Clear process, great support. Thank you OSIM!',
    avatar: 'https://i.pravatar.cc/100?img=48',
  },
];

const floatingElements = [
  { emoji: '🎓', delay: 0, duration: 20, x: '10%', y: '20%' },
  { emoji: '📚', delay: 2, duration: 25, x: '80%', y: '15%' },
  { emoji: '✈️', delay: 4, duration: 22, x: '15%', y: '70%' },
  { emoji: '🌍', delay: 6, duration: 28, x: '85%', y: '75%' },
  { emoji: '⭐', delay: 8, duration: 24, x: '50%', y: '10%' },
];

export default function StudentRegistrationHero() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-orange-50/20">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${BRAND_COLORS.primary} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${BRAND_COLORS.accent} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${BRAND_COLORS.secondary} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating emoji decorations */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20 pointer-events-none"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-orange-100 border border-blue-200/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" style={{ color: BRAND_COLORS.accent }} />
              <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.secondary }}>
                Join 10,000+ Students Worldwide
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: BRAND_COLORS.secondary }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Start Your{' '}
                <span
                  className="relative inline-block"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  Study Abroad
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 opacity-30 rounded"
                    style={{ backgroundColor: BRAND_COLORS.accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>{' '}
                Journey Today
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Create your student account in minutes. Upload your documents securely 
                and let our experts guide you to your dream university.
              </motion.p>
            </div>

            {/* Trust Indicators Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100/50 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div
                    className="flex-shrink-0 p-2 rounded-lg"
                    style={{ backgroundColor: `${BRAND_COLORS.primary}20` }}
                  >
                    <div style={{ color: BRAND_COLORS.primary }}>
                      {indicator.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: BRAND_COLORS.secondary }}>
                      {indicator.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {indicator.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Success Stories Carousel */}
            <motion.div
              className="relative p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Heart className="w-full h-full" style={{ color: BRAND_COLORS.accent }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5" style={{ color: BRAND_COLORS.primary }} />
                  <span className="text-sm font-semibold" style={{ color: BRAND_COLORS.secondary }}>
                    Student Success Stories
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    className="space-y-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={successStories[activeTestimonial].avatar}
                        alt={successStories[activeTestimonial].name}
                        className="w-12 h-12 rounded-full border-2"
                        style={{ borderColor: BRAND_COLORS.primary }}
                      />
                      <div>
                        <p className="font-semibold" style={{ color: BRAND_COLORS.secondary }}>
                          {successStories[activeTestimonial].name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {successStories[activeTestimonial].country} → {successStories[activeTestimonial].destination}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "{successStories[activeTestimonial].message}"
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Testimonial dots */}
                <div className="flex gap-2 mt-4">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: index === activeTestimonial ? BRAND_COLORS.primary : '#d1d5db',
                        width: index === activeTestimonial ? '24px' : '8px',
                      }}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: <Users />, value: '10,000+', label: 'Students Helped' },
                { icon: <Globe />, value: '50+', label: 'Countries' },
                { icon: <TrendingUp />, value: '95%', label: 'Success Rate' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${BRAND_COLORS.accent}20` }}
                  >
                    <div style={{ color: BRAND_COLORS.accent }} className="w-5 h-5">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: BRAND_COLORS.secondary }}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <StudentRegistrationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
