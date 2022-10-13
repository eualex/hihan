import { useState } from 'react'

import { Header } from '@/components/shared/layout'
import * as Page from '@/components/pages/landing'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const { status } = useSession()
  const { push } = useRouter()

  const [isStarted, setIsStarted] = useState(false)
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [moves, setMoves] = useState(0)
  const [minimalMoves, setMinimalMoves] = useState(0)

  if (status === 'unauthenticated') {
    push('/login')
  }

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
