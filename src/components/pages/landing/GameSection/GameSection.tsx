import { useSession } from 'next-auth/react'
import { ChangeEvent, DragEvent, useState } from 'react'
import { useStackState } from 'rooks'

import styles from './GameSection.module.scss'
import { Tower } from './Tower'

type StackHandler = {
  clear: () => void
  isEmpty: () => boolean
  length: number
  peek: () => number
  pop: () => number
  push: (item: number) => number
}

export function GameSection() {
  const [moves, setMoves] = useState(0)

  const [stackTower1, handleStackTower1] = useStackState<number>([1, 2, 3])
  const [stackTower2, handleStackTower2] = useStackState<number>([])
  const [stackTower3, handleStackTower3] = useStackState<number>([])

  function getStackHandlerByName(stackName: string) {
    const handlers = {
      stackTower1: handleStackTower1,
      stackTower2: handleStackTower2,
      stackTower3: handleStackTower3
    }

    return handlers[stackName]
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

    setMoves(prev => prev + 1)
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleChangeDisks(e: ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value)

    if (handleStackTower1.length === 3 && !stackTower1.includes(value)) {
      Array.from({ length: value }).forEach((_, index) => {
        if (!stackTower1.includes(index + 1)) {
          handleStackTower1.push(index + 1)
        }
      })
    } else {
      alert('Ihhh, vai dar não')
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.towerContainer}>
        <Tower.Group>
          <Tower
            name="stackTower1"
            stackTower={stackTower1}
            stackHandler={handleStackTower1}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
          />
          <Tower.Description>Torre 1</Tower.Description>
        </Tower.Group>
        <Tower.Group>
          <Tower
            name="stackTower2"
            stackTower={stackTower2}
            stackHandler={handleStackTower2}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
          />
          <Tower.Description>Torre 2</Tower.Description>
        </Tower.Group>
        <Tower.Group>
          <Tower
            name="stackTower3"
            stackTower={stackTower3}
            stackHandler={handleStackTower3}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
          />
          <Tower.Description>Torre 3</Tower.Description>
        </Tower.Group>
      </div>

      <footer className={styles.controlContainer}>
        <fieldset>
          <label htmlFor="game_levels">Nª de discos</label>
          <select id="game_levels" onChange={handleChangeDisks}>
            <option value="" disabled hidden></option>
            <option value="7">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </fieldset>
      </footer>
    </section>
  )
}
