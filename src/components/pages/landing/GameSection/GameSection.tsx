import { DragEvent } from 'react'
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

  function getStackHandlerByName(stackName: string) {
    if (stackName === 'stackTower1') {
      return handleStackTower1
    }
    if (stackName === 'stackTower2') {
      return handleStackTower2
    }
    if (stackName === 'stackTower3') {
      return handleStackTower3
    }

    return null
  }

  function addToStack(
    value: number,
    currentStackHandler: StackHandler,
    targetStackHandler: StackHandler
  ) {
    const lastValue = targetStackHandler.peek()

    if (!lastValue || value > lastValue) {
      currentStackHandler.pop()

      targetStackHandler.push(value)
    }
  }

  function onDragStart(
    e: DragEvent<HTMLSpanElement>,
    stackValue: number,
    currentStackName: string,
    stackHandler: StackHandler
  ) {
    const isDraggable = stackHandler.peek() === stackValue

    if (!isDraggable) return false

    e.dataTransfer.setData('stackValue', stackValue.toString())
    e.dataTransfer.setData('currentStackName', currentStackName.toString())
  }

  function onDrop(e: DragEvent<HTMLDivElement>, targetStackName: string) {
    e.preventDefault()

    const stackValue = Number(e.dataTransfer.getData('stackValue'))
    const currentStackName = e.dataTransfer.getData('currentStackName')

    if (!stackValue || !currentStackName) return false

    const currentStackHandler = getStackHandlerByName(currentStackName)
    const targetStackHandler = getStackHandlerByName(targetStackName)

    addToStack(stackValue, currentStackHandler, targetStackHandler)
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  return (
    <section className={styles.container}>
      <div className={styles.towerContainer}>
        <div className={styles.towerGroup}>
          <div
            className={styles.tower}
            onDrop={e => onDrop(e, 'stackTower1')}
            onDragOver={onDragOver}
          >
            {stackTower1.map((value, index) => (
              <span
                style={{ bottom: index * 20 + 'px' }}
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
          <p>Torre 1</p>
        </div>
        <div
          className={styles.tower}
          onDrop={e => onDrop(e, 'stackTower2')}
          onDragOver={onDragOver}
        >
          {stackTower2.map((value, index) => (
            <span
              style={{ bottom: index * 20 + 'px' }}
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
          className={styles.tower}
          onDrop={e => onDrop(e, 'stackTower3')}
          onDragOver={onDragOver}
        >
          {stackTower3.map((value, index) => (
            <span
              style={{ bottom: index * 20 + 'px' }}
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
