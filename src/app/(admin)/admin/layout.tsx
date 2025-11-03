import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  // Double-check authentication (middleware should handle this)
  if (!session?.user) {
    redirect('/auth/signin')
  }

  // Use admin role by default
  const displayRole = 'admin'

  // Serialize user data for Client Component
  const userData = {
    firstName: session.user.name?.split(' ')[0] || 'Admin',
    lastName: session.user.name?.split(' ')[1] || 'OSIMX',
    emailAddresses: [
      {
        emailAddress: session.user.email || 'admin@osimx.com'
      }
    ]
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
