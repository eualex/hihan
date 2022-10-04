import { DragEvent, useRef } from 'react'
import { useStackState } from 'rooks'

import styles from './GameSection.module.scss'

type StackHandler = {
  clear: () => void
  isEmpty: () => boolean
  length: number
  peek: () => number
  pop: () => number
  push: (item: number) => number
}

export function GameSection() {
  const [stackTower1, handleStackTower1] = useStackState<number>([1, 2, 3])
  const [stackTower2, handleStackTower2] = useStackState<number>([])
  const [stackTower3, handleStackTower3] = useStackState<number>([])

  const tower1Ref = useRef<HTMLDivElement>(null)
  const tower2Ref = useRef<HTMLDivElement>(null)
  const tower3Ref = useRef<HTMLDivElement>(null)

  function onDragStart(
    e: DragEvent<HTMLSpanElement>,
    stackValue: number,
    stackName: string,
    stackHandler: StackHandler
  ) {
    const isDraggable = stackHandler.peek() === stackValue

    if (!isDraggable) return false

    e.dataTransfer.setData('stackValue', stackValue.toString())
    e.dataTransfer.setData('stackName', stackValue.toString())
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const stackValue = Number(e.dataTransfer.getData('stackValue'))
    const stackName = e.dataTransfer.getData('stackName')

    if (!stackValue || !stackName) return false

    if (stackName === 'stackTower1') {
      console.log('a')
    }
    if (stackName === 'stackTower2') {
      console.log('b')
    }
    if (stackName === 'stackTower3') {
      console.log('c')
    }

    // const lastChild = e.currentTarget.lastChild as HTMLSpanElement
    // const artifactElement = document.getElementById(artifact) as HTMLSpanElement

    // if (
    //   !lastChild ||
    //   (lastChild?.clientWidth > artifactElement?.clientWidth &&
    //     !e.currentTarget.contains(artifactElement))
    // ) {
    //   if (artifactElement) {
    //     const artifactHeight = e.currentTarget.children.length * 20

    //     artifactElement.style.bottom = artifactHeight + 'px'

    //     e.currentTarget.appendChild(artifactElement)
    //   }
    // }
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
          {stackTower1.map(value => (
            <span
              key={`artifact${value}`}
              id={`artifact${value}`}
              className={styles[`artifact${value}`]}
              onDragStart={e =>
                onDragStart(e, value, 'stackTower1', handleStackTower1)
              }
              draggable={handleStackTower1.peek() === value}
            />
          ))}
        </div>
        <div
          ref={tower2Ref}
          className={styles.tower}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {stackTower2.map(value => (
            <span
              key={`artifact${value}`}
              id={`artifact${value}`}
              className={styles[`artifact${value}`]}
              onDragStart={e =>
                onDragStart(e, value, 'stackTower2', handleStackTower2)
              }
              draggable={handleStackTower2.peek() === value}
            />
          ))}
        </div>
        <div
          ref={tower3Ref}
          className={styles.tower}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {stackTower3.map(value => (
            <span
              key={`artifact${value}`}
              id={`artifact${value}`}
              className={styles[`artifact${value}`]}
              onDragStart={e =>
                onDragStart(e, value, 'stackTower3', handleStackTower3)
              }
              draggable={handleStackTower3.peek() === value}
            />
          ))}
        </div>
      </div>

      {/* <button className={styles.button}>Start Game</button> */}
    </section>
  )
}
