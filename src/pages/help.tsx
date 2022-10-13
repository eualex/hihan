import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import * as Page from '@/components/pages/help'
import { Header } from '@/components/shared/layout'

export default function Help() {
  const { status } = useSession()
  const { push } = useRouter()

  if (status === 'unauthenticated') {
    push('/login')
  }

  return (
    <>
      <Header />
      <Page.Solve />
    </>
  )
}
