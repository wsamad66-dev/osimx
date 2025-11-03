'use client'

import { useState } from 'react'
import { Menu, LogOut } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { ROLE_LABELS, ROLE_COLORS, type UserRole } from '@/lib/clerk/role-constants'
import { cn } from '@/lib/utils'
import AdminSidebar from './AdminSidebar'

interface AdminTopbarProps {
  user: {
    firstName: string | null
    lastName: string | null
    emailAddresses: Array<{ emailAddress: string }>
  }
  role: UserRole
}

export default function AdminTopbar({ user, role }: AdminTopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const displayName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.emailAddresses[0]?.emailAddress || 'User'

  return (
    <>
      <AdminSidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
      
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Title - hidden on mobile */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-900">Tableau de bord</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Role badge */}
          <div
            className={cn(
              'hidden sm:flex items-center px-3 py-1.5 rounded-full text-xs font-medium',
              ROLE_COLORS[role]
            )}
          >
            {ROLE_LABELS[role]}
          </div>

          {/* User info - hidden on small screens */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
          </div>

          {/* Clerk UserButton with custom appearance */}
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
                userButtonPopoverCard: 'shadow-xl',
              },
            }}
          />
        </div>
      </header>
    </>
  )
}
