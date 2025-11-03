import { auth } from '@clerk/nextjs/server'
import type { UserRole } from './role-constants'

export type { UserRole }

/**
 * Get the current user's role from Clerk metadata
 */
export async function getUserRole(): Promise<UserRole | null> {
  const { sessionClaims } = await auth()
  
  if (!sessionClaims?.metadata) {
    return null
  }

  const role = (sessionClaims.metadata as { role?: string }).role
  
  if (role && ['admin', 'cm', 'fr'].includes(role)) {
    return role as UserRole
  }

  return null
}

/**
 * Check if user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin'
}

/**
 * Check if user has any of the specified roles
 */
export async function hasRole(allowedRoles: UserRole[]): Promise<boolean> {
  const role = await getUserRole()
  return role !== null && allowedRoles.includes(role)
}

/**
 * Get user permissions based on role
 */
export async function getUserPermissions() {
  const role = await getUserRole()

  const permissions = {
    canManageLeads: false,
    canManageDocuments: false,
    canManageSettings: false,
    canViewReports: false,
    canAssignLeads: false,
    canVerifyDocuments: false,
  }

  switch (role) {
    case 'admin':
      // Admin has all permissions
      return {
        canManageLeads: true,
        canManageDocuments: true,
        canManageSettings: true,
        canViewReports: true,
        canAssignLeads: true,
        canVerifyDocuments: true,
      }
    
    case 'cm':
      // Commercial Manager can manage leads and view reports
      return {
        ...permissions,
        canManageLeads: true,
        canViewReports: true,
        canAssignLeads: true,
      }
    
    case 'fr':
      // France team member can manage documents and view reports
      return {
        ...permissions,
        canManageDocuments: true,
        canViewReports: true,
        canVerifyDocuments: true,
      }
    
    default:
      return permissions
  }
}

// Re-export constants for backward compatibility
export { ROLE_LABELS, ROLE_COLORS } from './role-constants'
