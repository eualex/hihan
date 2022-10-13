import styles from './EndGameSection.module.scss'

type Props = {
  moves: number
  minimalMoves: number
}

export function EndGameSection(props: Props) {
  return (
    <section className={styles.container}>
      <h1>Parabéns, você conseguiu!</h1>
      <div></div>
      <p>Mínimo de movimentos: {props.minimalMoves}</p>
      <p>Seus movimentos: {props.moves}</p>
    </section>
  )
}
