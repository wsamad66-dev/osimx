'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import { Quote, Star, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'

import type { HomepageTestimonial } from '@/types/homepage'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const FALLBACK_TESTIMONIALS: HomepageTestimonial[] = [
  {
    id: 1,
    studentName: 'Aïcha Diop',
    quote:
      "Admission à l'ESCP obtenue en six semaines. L'équipe a anticipé chaque document et m'a coachée pour l'entretien consulaire. Une expérience 5 étoiles.",
    rating: 5,
    country: 'Sénégal',
    destination: 'France',
    program: 'Programme Grande École',
    year: 2024,
    avatarUrl: '/images/testimonials/aicha.jpg',
  },
  {
    id: 2,
    studentName: 'Mohamed Touré',
    quote:
      "Processus transparent du début à la fin. Je suis désormais à l'Université de Montréal avec un logement sécurisé et un réseau d'amis incroyable.",
    rating: 5,
    country: "Côte d'Ivoire",
    destination: 'Canada',
    program: 'Sciences informatiques',
    year: 2023,
    avatarUrl: '/images/testimonials/mohamed.jpg',
  },
  {
    id: 3,
    studentName: 'Chidinma Okafor',
    quote:
      "Grâce à leur réseau en Italie, j'ai obtenu une bourse pour mon master en design de luxe à Milan. Maintenant je travaille chez Versace!",
    rating: 5,
    country: 'Nigéria',
    destination: 'Italie',
    program: 'Master Design de luxe',
    year: 2024,
    avatarUrl: '/images/testimonials/chidinma.jpg',
  },
  {
    id: 4,
    studentName: 'Fatou Ndiaye',
    quote:
      "Mon visa étudiant pour la Belgique a été approuvé du premier coup. L'équipe m'a préparée à chaque étape avec une précision remarquable.",
    rating: 5,
    country: 'Sénégal',
    destination: 'Belgique',
    program: 'Master en Commerce International',
    year: 2024,
    avatarUrl: '/images/testimonials/fatou.jpg',
  },
  {
    id: 5,
    studentName: 'Kwame Mensah',
    quote:
      "Étudier en Chine était mon rêve. Aujourd'hui je suis à Shanghai avec une bourse complète grâce à leur accompagnement exceptionnel.",
    rating: 5,
    country: 'Ghana',
    destination: 'Chine',
    program: 'Ingénierie Mécanique',
    year: 2023,
    avatarUrl: '/images/testimonials/kwame.jpg',
  },
]

interface TestimonialsSwiperProps {
  testimonials?: HomepageTestimonial[]
}

export function TestimonialsSwiper({ testimonials = FALLBACK_TESTIMONIALS }: TestimonialsSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const items = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 py-24 sm:py-28">
      {/* Decorative gradients */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] bg-gradient-to-br from-blue-200/30 to-transparent blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-gradient-to-tl from-purple-200/30 to-transparent blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center rounded-full bg-purple-600/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-purple-700">
            Témoignages
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Ils ont réalisé leurs rêves d'études
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Découvrez les parcours inspirants de nos étudiants qui ont réussi leur projet d'études à l'étranger
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl shadow-gray-900/10 transition-all hover:scale-110 hover:bg-blue-50 lg:flex"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-6 w-6 text-royal-blue" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl shadow-gray-900/10 transition-all hover:scale-110 hover:bg-blue-50 lg:flex"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-6 w-6 text-royal-blue" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            onSwiper={(swiper) => {
              if (swiperRef) swiperRef.current = swiper
            }}
            className="!pb-16"
          >
            {items.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative h-full"
                >
                  <div className="flex h-full flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/10">
                    {/* Quote Icon */}
                    <Quote className="h-10 w-10 text-vivid-blue/20" aria-hidden="true" />

                    {/* Testimonial Text */}
                    <blockquote className="flex-1 text-base leading-relaxed text-gray-700 sm:text-lg">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1" aria-label={`${testimonial.rating} étoiles sur 5`}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-5 w-5 ${
                            starIndex < testimonial.rating
                              ? 'fill-gold text-gold'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                      {/* Avatar */}
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-vivid-blue to-purple-600">
                        {testimonial.avatarUrl ? (
                          <Image
                            src={testimonial.avatarUrl}
                            alt={testimonial.studentName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                            {testimonial.studentName.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {testimonial.studentName}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                          <span>{testimonial.country}</span>
                          <span>→</span>
                          <span>{testimonial.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Program Badge */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                        <Briefcase className="h-3 w-3" />
                        {testimonial.program}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
                        {testimonial.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-vivid-blue">500+</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Étudiants accompagnés</div>
          </div>
          <div className="h-12 w-px bg-gray-300" aria-hidden="true" />
          <div>
            <div className="text-4xl font-bold text-success">95%</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Taux de réussite</div>
          </div>
          <div className="h-12 w-px bg-gray-300" aria-hidden="true" />
          <div>
            <div className="text-4xl font-bold text-gold">4.9/5</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Satisfaction client</div>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #3B82F6;
          opacity: 0.3;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  )
}
