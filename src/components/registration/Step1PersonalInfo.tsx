'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema, type PersonalInfo, COUNTRIES } from '@/lib/registration-schemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Mail, Phone, Calendar, MapPin, Globe2 } from 'lucide-react'

interface Step1PersonalInfoProps {
  defaultValues?: Partial<PersonalInfo>
  onNext: (data: PersonalInfo) => void
}

export function Step1PersonalInfo({ defaultValues, onNext }: Step1PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  })

  const onSubmit = (data: PersonalInfo) => {
    onNext(data)
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Header with description */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#26a5de] to-[#232d6e] flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#232d6e]">Informations Personnelles</h3>
            <p className="text-xs text-gray-500">Étape 1 sur 4</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 pl-13">
          Commençons par vos informations de base. Toutes les données sont <span className="text-[#26a5de] font-semibold">sécurisées</span> et confidentielles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* First Name */}
        <div className="space-y-2.5">
          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
            Prénom <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="Jean"
              className={`h-12 pl-10 text-base transition-all duration-200 ${
                errors.firstName 
                  ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                  : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
              }`}
            />
          </div>
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
            >
              <span>⚠️</span> {errors.firstName.message}
            </motion.p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2.5">
          <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
            Nom <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Dupont"
              className={`h-12 pl-10 text-base transition-all duration-200 ${
                errors.lastName 
                  ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                  : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
              }`}
            />
          </div>
          {errors.lastName && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
            >
              <span>⚠️</span> {errors.lastName.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2.5">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Adresse e-mail <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="jean.dupont@example.com"
            className={`h-12 pl-10 text-base transition-all duration-200 ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.email.message}
          </motion.p>
        )}
        {!errors.email && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Mail className="w-3 h-3" />
            Votre email de confirmation sera envoyé ici
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2.5">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
          Téléphone <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+33 6 12 34 56 78"
            className={`h-12 pl-10 text-base transition-all duration-200 ${
              errors.phone 
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}
          />
        </div>
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.phone.message}
          </motion.p>
        )}
        {!errors.phone && (
          <p className="text-xs text-gray-500">Format international requis (ex: +33612345678)</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Date of Birth */}
        <div className="space-y-2.5">
          <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-700">
            Date de naissance <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
              className={`h-12 pl-10 text-base transition-all duration-200 ${
                errors.dateOfBirth 
                  ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                  : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
            >
              <span>⚠️</span> {errors.dateOfBirth.message}
            </motion.p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2.5">
          <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
            Pays de résidence <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <Select
              onValueChange={(value) => setValue('country', value)}
              defaultValue={defaultValues?.country}
            >
              <SelectTrigger className={`h-12 pl-10 text-base transition-all duration-200 bg-white ${
                errors.country
                  ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50'
                  : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
              }`}>
                <SelectValue placeholder="Sélectionnez votre pays" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-[300px]">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country} className="bg-white hover:bg-gray-100 cursor-pointer">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.country && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
            >
              <span>⚠️</span> {errors.country.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Nationality */}
      <div className="space-y-2.5">
        <Label htmlFor="nationality" className="text-sm font-semibold text-gray-700">
          Nationalité <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <Select
            onValueChange={(value) => setValue('nationality', value)}
            defaultValue={defaultValues?.nationality}
          >
            <SelectTrigger className={`h-12 pl-10 text-base transition-all duration-200 bg-white ${
              errors.nationality
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50'
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}>
              <SelectValue placeholder="Sélectionnez votre nationalité" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[300px]">
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country} className="bg-white hover:bg-gray-100 cursor-pointer">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.nationality && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.nationality.message}
          </motion.p>
        )}
      </div>

      {/* Submit button (hidden - form submitted by modal navigation) */}
      <button type="submit" className="hidden" id="step1-submit" />
    </motion.form>
  )
}
