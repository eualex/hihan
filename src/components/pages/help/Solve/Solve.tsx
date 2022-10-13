import styles from './Solve.module.scss'

export function Solve() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <h1>Como jogar o Hihan</h1>
            <ul>
              <li>Movimentar um disco de cada vez</li>
              <li>Uma peça maior não pode ficar acima de uma menor</li>
              <li>
                Não é permitido movimentar uma peça que esteja abaixo de outra
              </li>
            </ul>
          </div>
          <hr />
          <div className={styles.roles}>
            <h1>Regras da Torre de Hanoi</h1>
            <p>Instruções para 3 discos</p>
            <ol>
              <li>Mova o disco 1 (menor) para a Torre 3</li>
              <li>Mova o disco 2 (médio) para a Torre 2</li>
              <li>Mova o disco 1 (menor) para a Torre 2</li>
              <li>Mova o disco 3 (maior) para a Torre 3</li>
              <li>Mova o disco 1 (menor) para a Torre 1</li>
              <li>Mova o disco 2 (médio) para a Torre 3</li>
              <li>Mova o disco 1 (menor) para a Torre 3</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
