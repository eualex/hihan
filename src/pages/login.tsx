import { LoginSection } from '@/components/pages/login/LoginSection'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const { status } = useSession()
  const { push } = useRouter()

  if (status === 'authenticated') {
    push('/')
  }

  return (
    <>
      <LoginSection />
    </>
  )
}
