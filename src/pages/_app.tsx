import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import '@/styles/global.scss'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
