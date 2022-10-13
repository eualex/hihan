import { ChangeEvent, DragEvent, useEffect, useState } from 'react'
import { useStack, StackHandler } from './useStack'

import { Tower } from './Tower'

import styles from './GameSection.module.scss'

// type Props = {
//   onGameEnd: (moves: number, minimalMovements: number) => void
// }

export function GameSection() {
  const [moves, setMoves] = useState(0)
  const [disks, setDisks] = useState(3)

  const [stackTower1, handleStackTower1] = useStack<number>([1, 2, 3])
  const [stackTower2, handleStackTower2] = useStack<number>([])
  const [stackTower3, handleStackTower3] = useStack<number>([])

  const minimalMovements = 2 ** disks - 1

  useEffect(() => {
    if (stackTower3.length === disks) {
      alert('Acabouuuuu')
    }
  }, [stackTower3, disks])

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
    currentStackHandler: StackHandler<number>,
    targetStackHandler: StackHandler<number>
  ) {
    const lastValue = targetStackHandler.peek()

    if (!lastValue || value > lastValue) {
      currentStackHandler.pop()

      targetStackHandler.push(value)

      setMoves(prev => prev + 1)
    }
  }

  function onDragStart(
    e: DragEvent<HTMLSpanElement>,
    stackValue: number,
    currentStackName: string,
    stackHandler: StackHandler<number>
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

  function handleChangeDisks(e: ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value)

    if (!handleStackTower2.isEmpty() || !handleStackTower3.isEmpty()) {
      alert('Calma aí, rei!')
    }

    const values = Array.from({ length: value })
      .map((_, index) => {
        return !stackTower1.includes(index + 1) ? index + 1 : null
      })
      .filter(v => !!v)

    handleStackTower1.length < value
      ? handleStackTower1.setList(prev => [...prev, ...values])
      : handleStackTower1.setList(prev => prev.filter(v => v <= value))

    setDisks(value)
  }

  return (
    <section className={styles.container}>
      <div className={styles.movesContainer}>
        <h3
          className={
            moves <= minimalMovements ? styles.greenText : styles.redText
          }
        >
          Movimentos: {moves}
        </h3>
        <p>Movimentos mínimos: {minimalMovements}</p>
      </div>

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
          <label htmlFor="game_levels">Discos:</label>
          <div>
            <select id="game_levels" onChange={handleChangeDisks} value={disks}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        </fieldset>
      </footer>
    </section>
  )
}
