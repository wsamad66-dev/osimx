export type UserRole = 'admin' | 'cm' | 'fr'

/**
 * Role display names
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrateur',
  cm: 'Commercial Manager',
  fr: 'Équipe France',
}

/**
 * Role colors for badges
 */
export const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-800',
  cm: 'bg-blue-100 text-blue-800',
  fr: 'bg-green-100 text-green-800',
}
