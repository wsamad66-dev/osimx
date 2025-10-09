'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { securitySchema, type Security } from '@/lib/registration-schemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Shield, Check, X } from 'lucide-react'

interface Step4SecurityProps {
  defaultValues?: Partial<Security>
  onNext: (data: Security) => void
  onBack: () => void
}

export function Step4Security({ defaultValues, onNext, onBack }: Step4SecurityProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Security>({
    resolver: zodResolver(securitySchema),
    defaultValues,
  })

  const termsAccepted = watch('termsAccepted')

  const onSubmit = (data: Security) => {
    onNext(data)
  }

  // Password strength calculation
  const calculateStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++
    return strength
  }

  const strength = calculateStrength(password)
  const strengthPercent = (strength / 5) * 100
  const strengthColor =
    strength <= 2 ? 'bg-red-500' : strength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
  const strengthText =
    strength <= 2 ? 'Faible' : strength <= 3 ? 'Moyen' : 'Fort'

  const requirements = [
    { met: password.length >= 8, text: 'Au moins 8 caractères' },
    { met: /[A-Z]/.test(password), text: 'Une majuscule' },
    { met: /[a-z]/.test(password), text: 'Une minuscule' },
    { met: /[0-9]/.test(password), text: 'Un chiffre' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'Un caractère spécial' },
  ]

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
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#232d6e]">Sécurité du Compte</h3>
            <p className="text-xs text-gray-500">Étape 4 sur 4 - Dernière étape !</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 pl-13">
          Créez un <span className="text-[#26a5de] font-semibold">mot de passe sécurisé</span> pour protéger vos données. Nous utilisons un cryptage de niveau bancaire.
        </p>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">
          Mot de passe <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            onChange={(e) => {
              setPassword(e.target.value)
              setValue('password', e.target.value)
            }}
            className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {/* Password strength meter */}
        {password && (
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Force du mot de passe</span>
              <span className={`font-semibold ${
                strength <= 2 ? 'text-red-600' : strength <= 3 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {strengthText}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${strengthColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${strengthPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Requirements checklist */}
        {password && (
          <div className="mt-3 space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                {req.met ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <X className="w-3 h-3 text-gray-400" />
                )}
                <span className={req.met ? 'text-green-700' : 'text-gray-500'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirmer le mot de passe <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms and conditions */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Checkbox
            id="termsAccepted"
            checked={termsAccepted}
            onCheckedChange={(checked) => setValue('termsAccepted', checked as boolean)}
            className={errors.termsAccepted ? 'border-red-500' : ''}
          />
          <Label
            htmlFor="termsAccepted"
            className="text-sm leading-relaxed cursor-pointer"
          >
            J'accepte les{' '}
            <a
              href="/legal/conditions-d-utilisation"
              target="_blank"
              className="text-[#26a5de] hover:underline font-medium"
            >
              conditions d'utilisation
            </a>{' '}
            et la{' '}
            <a
              href="/legal/confidentialite"
              target="_blank"
              className="text-[#26a5de] hover:underline font-medium"
            >
              politique de confidentialité
            </a>
          </Label>
        </div>
        {errors.termsAccepted && (
          <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
        )}
      </div>

      {/* Submit button (hidden) */}
      <button type="submit" className="hidden" id="step4-submit" />
    </motion.form>
  )
}
