import styles from './Solve.module.scss'

export function Solve() {
  return (
    <section className={styles.container}>
      <h2>Regras da Torre de Hanoi</h2>
      <ol>
        <li>Movimentar um disco de cada vez</li>
        <li>Uma peça maior não pode ficar acima de uma menor</li>
        <li>Não é permitido movimentar uma peça que esteja abaixo de outra</li>
      </ol>
    </section>
  )
}
