import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { Header } from '@/components/shared/layout'
import * as Page from '@/components/pages/landing'

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [moves, setMoves] = useState(0)
  const [minimalMoves, setMinimalMoves] = useState(0)

  return (
    <>
      <Header />
      <Page.Hero>
        {isStarted ? (
          <Page.Hero.Button onClick={() => setIsStarted(false)}>
            Fechar
          </Page.Hero.Button>
        ) : (
          <Page.Hero.Button
            onClick={() => {
              setIsStarted(true)
              setIsGameEnd(false)
            }}
          >
            Iniciar
          </Page.Hero.Button>
        )}
      </Page.Hero>
      {isStarted && !isGameEnd && (
        <Page.GameSection
          onGameEnd={(gameMoves, gameMinimalMoves) => {
            setIsGameEnd(true)
            setIsStarted(false)
            setMoves(gameMoves)
            setMinimalMoves(gameMinimalMoves)
          }}
        />
      )}

      {!isStarted && isGameEnd && (
        <Page.EndGameSection minimalMoves={minimalMoves} moves={moves} />
      )}
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
