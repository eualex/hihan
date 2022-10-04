import { DragEvent } from 'react'

import styles from './GameSection.module.scss'

export function GameSection() {
  function onDragStart(e: DragEvent<HTMLSpanElement>) {
    e.dataTransfer.setData('artifact', e.currentTarget.id)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const artifact = e.dataTransfer.getData('artifact')
    const lastChild = e.currentTarget.lastChild as HTMLSpanElement
    const artifactElement = document.getElementById(artifact) as HTMLSpanElement

    if (!lastChild || lastChild.clientWidth > artifactElement.clientWidth)
      e.currentTarget.appendChild(artifactElement)
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  return (
    <section className={styles.container}>
      <div className={styles.towerContainer}>
        <div className={styles.tower} onDrop={onDrop} onDragOver={onDragOver}>
          <span
            id="artifact3"
            className={styles.artifact3}
            onDragStart={onDragStart}
            draggable
          ></span>
          <span
            id="artifact2"
            className={styles.artifact2}
            onDragStart={onDragStart}
            draggable
          ></span>
          <span
            id="artifact1"
            className={styles.artifact1}
            onDragStart={onDragStart}
            draggable
          ></span>
        </div>
        <div className={styles.tower} onDrop={onDrop} onDragOver={onDragOver} />
        <div className={styles.tower} onDrop={onDrop} onDragOver={onDragOver} />
      </div>

      {/* <button className={styles.button}>Start Game</button> */}
    </section>
  )
}
