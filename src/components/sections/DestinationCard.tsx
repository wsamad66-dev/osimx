'use client'

import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Users, GraduationCap, TrendingUp } from 'lucide-react'

export interface DestinationData {
  flag: string
  name: string
  tagline: string
  students: string
  universities: string
  successRate: string
  highlights: string[]
}

export const destinationsData: DestinationData[] = [
  {
    flag: '🇨🇦',
    name: 'Canada',
    tagline: 'Immigration facilitée',
    students: '3500+',
    universities: '50+',
    successRate: '97%',
    highlights: [
      'Permis de travail post-études',
      'Immigration permanente facilitée',
      'Coût de vie abordable',
    ],
  },
  {
    flag: '🇫🇷',
    name: 'France',
    tagline: 'Excellence académique',
    students: '2800+',
    universities: '45+',
    successRate: '95%',
    highlights: [
      'Frais universitaires bas',
      'Bourses disponibles',
      'Culture francophone',
    ],
  },
  {
    flag: '🇺🇸',
    name: 'USA',
    tagline: 'Innovation & Tech',
    students: '800+',
    universities: '60+',
    successRate: '89%',
    highlights: [
      'Meilleures universités mondiales',
      'Opportunités de recherche',
      'Réseau professionnel étendu',
    ],
  },
  {
    flag: '🇬🇧',
    name: 'Royaume-Uni',
    tagline: 'Prestige académique',
    students: '650+',
    universities: '30+',
    successRate: '91%',
    highlights: [
      'Masters en 1 an',
      'Universités prestigieuses',
      'Hub financier européen',
    ],
  },
]

export function DestinationCard({
  flag,
  name,
  tagline,
  students,
  universities,
  successRate,
  highlights,
}: DestinationData) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary-400 cursor-pointer overflow-hidden">
      <div className="bg-gradient-to-br from-primary-50 to-navy-50 p-6 text-center border-b">
        <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
          {flag}
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{tagline}</p>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div className="bg-primary-50 rounded-lg p-3">
            <Users className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Étudiants</p>
            <p className="text-sm font-bold text-navy-900">{students}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <GraduationCap className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Universités</p>
            <p className="text-sm font-bold text-navy-900">{universities}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Succès</p>
            <p className="text-sm font-bold text-navy-900">{successRate}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-600" />
            Points forts:
          </p>
          <ul className="space-y-1.5">
            {highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 flex items-start gap-2"
              >
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full mt-6 py-3 bg-gradient-to-r from-primary-600 to-navy-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
          En savoir plus
        </button>
      </CardContent>
    </Card>
  )
}
