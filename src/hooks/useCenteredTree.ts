import { useCallback, useState } from 'react'
import { type Point } from 'react-d3-tree'

const useCenteredTree = (): [Point, (containerElem: HTMLDivElement) => void] => {
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 })

  const containerRef = useCallback((containerElem: Element) => {
    if (!containerElem) return

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = containerElem.getBoundingClientRect()
      setTranslate({ x: width / 2, y: height / 2 })
    })

    resizeObserver.observe(containerElem)
  }, [])
  return [translate, containerRef]
}

export default useCenteredTree
