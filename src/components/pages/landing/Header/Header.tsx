import { signOut } from 'next-auth/react'
import Link from 'next/link'

import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link href="/" passHref>
              <a>Hihan</a>
            </Link>
          </div>
          <nav className={styles.nav}>
            <a href="./score">SCORE</a>
            <a href="./">COMO RESOLVER</a>
            <button className={styles.signout} onClick={() => signOut()}>
              SAIR
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
