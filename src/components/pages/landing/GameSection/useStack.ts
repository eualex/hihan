import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

export type StackHandler<T> = {
  clear: () => void
  isEmpty: () => boolean
  length: number
  peek: () => T
  pop: () => T
  push: (item: T) => number
  setList: Dispatch<SetStateAction<T[]>>
}

export function useStack<T>(
  initialList: Array<T>
): [T[], StackHandler<T>, T[]] {
  const [list, setList] = useState([...initialList])

  const length = list.length

  const listInReverse = useMemo(() => {
    const reverseList = [...list]
    reverseList.reverse()
    return reverseList
  }, [list])

  const push = useCallback(
    (item: T) => {
      const newList = [...list, item]
      setList(newList)
      return newList.length
    },
    [list]
  )

  const pop = useCallback(() => {
    if (list.length > 0) {
      const lastItem = list[list.length - 1]
      setList([...list.slice(0, list.length - 1)])
      return lastItem
    }
    return undefined
  }, [list])

  const peek = useCallback(() => {
    if (list.length > 0) {
      return list[list.length - 1]
    }
    return undefined
  }, [list])

  const clear = () => setList([])

  const isEmpty = useCallback(() => list.length === 0, [list])

  const controls = {
    clear,
    isEmpty,
    length,
    peek,
    pop,
    push,
    setList
  }

  return [list, controls, listInReverse]
}
