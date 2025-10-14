import { ReactNode } from 'react'
import { getUserRole, type UserRole } from '@/lib/clerk/roles'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallback?: ReactNode
}

export default async function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const role = await getUserRole()

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
