import { signIn } from 'next-auth/react'
import { BsGithub } from 'react-icons/bs'

import styles from './LoginSection.module.scss'

export function LoginSection() {
  return (
    <section className={styles.loginSection}>
      <button className={styles.loginButton} onClick={() => signIn('github')}>
        <BsGithub />
        Login com Github
      </button>
    </section>
  )
}
