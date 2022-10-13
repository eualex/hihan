import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import * as Page from '@/components/pages/help'
import { Header } from '@/components/shared/layout'

export default function Help() {
  return (
    <>
      <Header />
      <Page.Solve />
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
