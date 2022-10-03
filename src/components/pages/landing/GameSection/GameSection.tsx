import styles from './GameSection.module.scss'

export function GameSection() {
  return (
    <section className={styles.container}>
      <div className={styles.towerContainer}>
        <div className={styles.tower} />
        <div className={styles.tower} />
        <div className={styles.tower} />
      </div>
  
      <button className={styles.button}>Start Game</button>
    </section>
  )
}
