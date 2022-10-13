import { DragEvent, DragEventHandler, PropsWithChildren } from 'react'

import styles from './GameSection.module.scss'

type StackHandler = {
  clear: () => void
  isEmpty: () => boolean
  length: number
  peek: () => number
  pop: () => number
  push: (item: number) => number
}

type TowerProps = {
  name: string
  onDragOver: DragEventHandler<HTMLDivElement>
  onDrop: (e: DragEvent, stackName: string) => void
  onDragStart: (
    e: DragEvent,
    currentValue: number,
    stackName: string,
    handler: StackHandler
  ) => void
  stackTower: number[]
  stackHandler: StackHandler
}

export function Tower(props: TowerProps) {
  const { onDrop, onDragOver, onDragStart, stackTower, stackHandler, name } =
    props

  return (
    <div
      className={styles.tower}
      onDrop={e => onDrop(e, name)}
      onDragOver={onDragOver}
    >
      {stackTower.map((value, index) => (
        <span
          // style={{ bottom: index * 20 + 'px' }}
          key={`artifact${value}`}
          id={`artifact${value}`}
          className={styles[`artifact${value}`]}
          onDragStart={e => onDragStart(e, value, name, stackHandler)}
          draggable={stackHandler.peek() === value}
        />
      ))}
    </div>
  )
}

function TowerGroup({ children }: PropsWithChildren) {
  return <div className={styles.towerGroup}>{children}</div>
}

function TowerDescription({ children }: PropsWithChildren) {
  return <p>{children}</p>
}

Tower.Group = TowerGroup
Tower.Description = TowerDescription
