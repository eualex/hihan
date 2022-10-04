import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h1>Hihan</h1>
          </div>
          <nav className={styles.nav}>
            <a href="./login">Login</a>
            <a href="./login">Historico</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
