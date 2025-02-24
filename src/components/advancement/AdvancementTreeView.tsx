'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { type CustomNodeElementProps, Tree } from 'react-d3-tree'

import AdvancementIcon from '../AdvancementIcon'

import useCenteredTree from '@/hooks/useCenteredTree'
import { LocalizedNode } from '@/model/ProgressNode'

type TreeNode = {
  name: string
  children?: TreeNode[]
}

const convert = (nodes: Record<string, LocalizedNode>, key: string): TreeNode | null => {
  const children: TreeNode[] = []

  if (!nodes[key]) {
    return null
  }

  for (const childKey in nodes[key]?.children) {
    const child = convert(nodes, childKey)
    if (child) {
      children.push(child)
    }
  }

  children.sort((a, b) => a.name.localeCompare(b.name))

  return {
    name: nodes[key].key,
    children,
  }
}

const renderNode = (
  nodes: Record<string, LocalizedNode>,
  isDone: (key: string) => boolean,
  onSelect: (selectedKey: string) => void,
  onIconLoaded: (state: boolean) => void,
) => {
  return function render(props: CustomNodeElementProps) {
    const node = nodes[props.nodeDatum.name]

    return (
      <g>
        <foreignObject width={52} height={52} x={-26} y={-26}>
          <AdvancementIcon
            node={node}
            done={isDone(node.key)}
            bgSize={52}
            iconSize={32}
            onMouseOver={() => onSelect(node.key)}
            onIconLoad={() => onIconLoaded(true)}
          />
        </foreignObject>
      </g>
    )
  }
}

const getDepth = (node: TreeNode): number => {
  if (node.children && node.children.length > 0) {
    return 1 + Math.max(...node.children.map((child) => getDepth(child)))
  }

  return 0
}

interface Props {
  root: string
  nodes: Record<string, LocalizedNode>
  isDone: (key: string) => boolean
  onHover: (selectedKey: string) => void
}

export default function AdvancementTreeView({ nodes, root, isDone, onHover }: Props) {
  const data = useMemo(() => convert(nodes, root)!, [nodes, root])
  const depth = useMemo(() => getDepth(data), [data])

  const [iconLoaded, setIconLoaded] = useState(false)
  const [translate, containerRef] = useCenteredTree()

  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <div className='w-full h-full' ref={containerRef}>
        <Tree
          key={root}
          data={data}
          translate={{ x: translate.x - (depth / 2) * 60, y: translate.y }}
          collapsible={false}
          pathFunc={'step'}
          nodeSize={{ x: 60, y: 60 }}
          separation={{
            siblings: 1,
            nonSiblings: 1,
          }}
          zoom={1}
          scaleExtent={{ max: 3, min: 0.5 }}
          renderCustomNodeElement={renderNode(nodes, isDone, onHover, setIconLoaded)}
          pathClassFunc={() => `${!iconLoaded ? 'invisible' : ''} stroke-3 dark:!stroke-white`}
        />
      </div>
    )
  )
}
