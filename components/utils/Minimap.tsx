import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state, damp } from './util'

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0)
])

export function Minimap (props) {
  const ref = useRef()
  const scroll = useScroll()
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    // @ts-expect-error
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / props.urls.length - 1.5 / props.urls.length,
        4 / props.urls.length
      )
      child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, delta)
    })
  })
  return (
    <group ref={ref}>
      {props.urls.map((_, i) => (
        <line
          key={i}
          // @ts-expect-error
          geometry={geometry}
          material={material}
          position={[i * 0.06 - props.urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  )
}
