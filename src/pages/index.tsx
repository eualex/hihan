import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { Header } from '@/components/shared/layout'
import * as Page from '@/components/pages/landing'

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <>
      <Header />
      <Page.Hero>
        {isStarted ? (
          <Page.Hero.Button onClick={() => setIsStarted(false)}>
            Fechar
          </Page.Hero.Button>
        ) : (
          <Page.Hero.Button onClick={() => setIsStarted(true)}>
            Iniciar
          </Page.Hero.Button>
        )}
      </Page.Hero>
      {isStarted && <Page.GameSection />}
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
