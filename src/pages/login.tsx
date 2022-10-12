import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

import { LoginSection } from '@/components/pages/login/LoginSection'

export default function Login() {
  return (
    <>
      <LoginSection />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
