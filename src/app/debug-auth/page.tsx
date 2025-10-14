'use client'

import { useAuth, useUser } from '@clerk/nextjs'

export default function DebugAuthPage() {
  const { userId, sessionClaims } = useAuth()
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Auth Info</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User ID</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {userId || 'Not authenticated'}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Claims (Full)</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(sessionClaims, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Public Metadata</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(user?.publicMetadata, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Unsafe Metadata</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(user?.unsafeMetadata, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Full User Object</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
