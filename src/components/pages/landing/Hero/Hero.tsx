import { useSession } from 'next-auth/react'
import { HTMLAttributes, PropsWithChildren } from 'react'
import styles from './Hero.module.scss'

export function Hero({ children }: PropsWithChildren) {
  const { data } = useSession()

  return (
    <header className={styles.hero}>
      <div>
        <h3>Olá, {data?.user?.name}</h3>
        <p>Bom jogo!</p>
      </div>

      {children}
    </header>
  )
}

export function Button(props: HTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.button} {...props} />
}

Hero.Button = Button
