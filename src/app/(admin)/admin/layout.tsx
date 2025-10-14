import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { getUserRole } from '@/lib/clerk/roles'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await currentUser()
  const role = await getUserRole()

  // Double-check authentication (middleware should handle this)
  if (!user) {
    redirect('/sign-in')
  }

  // Use a default role if not configured in Clerk yet
  const displayRole = role || 'admin'

  // Serialize user data for Client Component
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map(email => ({
      emailAddress: email.emailAddress
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminTopbar user={userData} role={displayRole} />
        
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
