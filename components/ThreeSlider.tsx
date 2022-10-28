import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './utils/Minimap'
import { state, damp } from './utils/util'

// eslint-disable-next-line react/prop-types
function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    )
    // @ts-ignore
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      // @ts-ignore
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    )
    // @ts-ignore
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      // @ts-ignore
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    )
    if (clicked !== null && index < clicked)
      // @ts-ignore
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      )
    if (clicked !== null && index > clicked)
      // @ts-ignore
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      )
    if (clicked === null || clicked === index)
      // @ts-ignore
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      )
    // @ts-ignore
    ref.current.material.grayscale = damp(
      // @ts-ignore
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    )
    // @ts-ignore
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? 'white' : '#aaa'),
      hovered ? 0.3 : 0.1
    )
  })
  return (
    // @ts-ignore
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  )
}

// eslint-disable-next-line react/prop-types
function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap
  return (
    <ScrollControls
      horizontal
      damping={10}
      pages={(width - xW + urls.length * xW) / width}
    >
      <Minimap />
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  )
}

const ThreeSlider = () => (
  <Canvas
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    onPointerMissed={() => (state.clicked = null)}
  >
    <Items />
  </Canvas>
)

export default ThreeSlider
