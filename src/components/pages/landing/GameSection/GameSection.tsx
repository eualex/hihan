import { DragEvent, useRef } from 'react'

import styles from './GameSection.module.scss'
export function GameSection() {
  const tower1Ref = useRef<HTMLDivElement>(null)
  const tower2Ref = useRef<HTMLDivElement>(null)
  const tower3Ref = useRef<HTMLDivElement>(null)

  function onDragStart(e: DragEvent<HTMLSpanElement>) {
    const lastTowerElements = [
      tower1Ref.current.lastChild,
      tower2Ref.current.lastChild,
      tower3Ref.current.lastChild
    ]

    const artifact = document.getElementById(e.currentTarget.id)

    if (lastTowerElements.includes(artifact)) {
      e.dataTransfer.setData('artifact', e.currentTarget.id)
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const artifact = e.dataTransfer.getData('artifact')
    const lastChild = e.currentTarget.lastChild as HTMLSpanElement
    const artifactElement = document.getElementById(artifact) as HTMLSpanElement

    if (
      !lastChild ||
      (lastChild?.clientWidth > artifactElement?.clientWidth &&
        !e.currentTarget.contains(artifactElement))
    ) {
      if (artifactElement) {
        const artifactHeight = e.currentTarget.children.length * 20

        artifactElement.style.bottom = artifactHeight + 'px'

        e.currentTarget.appendChild(artifactElement)
      }
    }
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  return (
    <section className={styles.container}>
      <div className={styles.towerContainer}>
        <div
          ref={tower1Ref}
          className={styles.tower}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <span
            key="artifact3"
            id="artifact3"
            className={styles.artifact3}
            onDragStart={onDragStart}
            draggable
          />

          <span
            key="artifact2"
            id="artifact2"
            className={styles.artifact2}
            onDragStart={onDragStart}
            draggable
          />

          <span
            key="artifact1"
            id="artifact1"
            className={styles.artifact1}
            onDragStart={onDragStart}
            draggable
          />
        </div>
        <div
          ref={tower2Ref}
          className={styles.tower}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
        <div
          ref={tower3Ref}
          className={styles.tower}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>

      {/* <button className={styles.button}>Start Game</button> */}
    </section>
  )
}
