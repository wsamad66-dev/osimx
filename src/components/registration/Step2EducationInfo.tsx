'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { educationInfoSchema, type EducationInfo, EDUCATION_LEVELS, COUNTRIES } from '@/lib/registration-schemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap, BookOpen, Calendar, Target, MapPin } from 'lucide-react'

interface Step2EducationInfoProps {
  defaultValues?: Partial<EducationInfo>
  onNext: (data: EducationInfo) => void
  onBack: () => void
}

export function Step2EducationInfo({ defaultValues, onNext, onBack }: Step2EducationInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EducationInfo>({
    resolver: zodResolver(educationInfoSchema),
    defaultValues,
  })

  const onSubmit = (data: EducationInfo) => {
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
      {/* Header */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#26a5de] to-[#232d6e] flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#232d6e]">Parcours Académique</h3>
            <p className="text-xs text-gray-500">Étape 2 sur 4</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 pl-13">
          Partagez vos <span className="text-[#26a5de] font-semibold">objectifs académiques</span> pour que nous puissions vous guider vers le meilleur programme.
        </p>
      </div>

      {/* Education Level */}
      <div className="space-y-2.5">
        <Label htmlFor="educationLevel" className="text-sm font-semibold text-gray-700">
          Niveau d'études actuel <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <Select
            onValueChange={(value) => setValue('educationLevel', value as any)}
            defaultValue={defaultValues?.educationLevel}
          >
            <SelectTrigger className={`h-12 pl-10 text-base transition-all duration-200 bg-white ${
              errors.educationLevel
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50'
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}>
              <SelectValue placeholder="Sélectionnez votre niveau" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[300px]">
              {EDUCATION_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value} className="bg-white hover:bg-gray-100 cursor-pointer">
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.educationLevel && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.educationLevel.message}
          </motion.p>
        )}
      </div>

      {/* Intended Program */}
      <div className="space-y-2.5">
        <Label htmlFor="intendedProgram" className="text-sm font-semibold text-gray-700">
          Programme souhaité <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="intendedProgram"
            {...register('intendedProgram')}
            placeholder="Ex: Master en Informatique, Licence en Commerce..."
            className={`h-12 pl-10 text-base transition-all duration-200 ${
              errors.intendedProgram 
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50' 
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}
          />
        </div>
        {errors.intendedProgram && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.intendedProgram.message}
          </motion.p>
        )}
        {!errors.intendedProgram && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Indiquez le domaine d'études qui vous intéresse
          </p>
        )}
      </div>

      {/* Intended Country */}
      <div className="space-y-2.5">
        <Label htmlFor="intendedCountry" className="text-sm font-semibold text-gray-700">
          Pays de destination <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <Select
            onValueChange={(value) => setValue('intendedCountry', value)}
            defaultValue={defaultValues?.intendedCountry}
          >
            <SelectTrigger className={`h-12 pl-10 text-base transition-all duration-200 bg-white ${
              errors.intendedCountry
                ? 'border-red-500 focus:ring-red-500/20 bg-red-50/50'
                : 'focus:ring-2 focus:ring-[#26a5de]/20 focus:border-[#26a5de] hover:border-[#26a5de]/60'
            }`}>
              <SelectValue placeholder="Où souhaitez-vous étudier ?" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[300px]">
              {/* Popular destinations first */}
              <SelectItem value="Canada" className="bg-white hover:bg-gray-100 cursor-pointer">🇨🇦 Canada</SelectItem>
              <SelectItem value="France" className="bg-white hover:bg-gray-100 cursor-pointer">🇫🇷 France</SelectItem>
              <SelectItem value="États-Unis" className="bg-white hover:bg-gray-100 cursor-pointer">🇺🇸 États-Unis</SelectItem>
              <SelectItem value="Royaume-Uni" className="bg-white hover:bg-gray-100 cursor-pointer">🇬🇧 Royaume-Uni</SelectItem>
              <SelectItem value="Allemagne" className="bg-white hover:bg-gray-100 cursor-pointer">🇩🇪 Allemagne</SelectItem>
              <SelectItem value="Australie" className="bg-white hover:bg-gray-100 cursor-pointer">🇦🇺 Australie</SelectItem>
              <SelectItem value="__divider__" disabled className="bg-gray-100">
                ──────────────
              </SelectItem>
              {/* All countries */}
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country} className="bg-white hover:bg-gray-100 cursor-pointer">
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
        {errors.intendedCountry && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1.5 font-medium"
          >
            <span>⚠️</span> {errors.intendedCountry.message}
          </motion.p>
        )}
      </div>

      {/* Submit button (hidden) */}
      <button type="submit" className="hidden" id="step2-submit" />
    </motion.form>
  )
}
