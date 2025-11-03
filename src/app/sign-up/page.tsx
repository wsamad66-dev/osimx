import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage() {
  const user = await currentUser()

  // If already signed in, redirect to admin
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-xl'
          }
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        redirectUrl="/admin"
      />
    </div>
  )
}
