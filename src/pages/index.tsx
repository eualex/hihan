import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { GameSection, Header } from '@/components/pages/landing'

export default function Home() {
  return (
    <>
      <Header />
      <GameSection />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
