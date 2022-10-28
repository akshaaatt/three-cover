import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './utils/Minimap'
import { state, damp } from './utils/util'

const Item = ({
  index,
  position,
  scale,
  c = new THREE.Color(),
  ...props
}): JSX.Element => {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = (): void => (state.clicked = index === clicked ? null : index)
  const over = (): void => hover(true)
  const out = (): void => hover(false)
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    )
    // @ts-expect-error
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      // @ts-expect-error
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    )
    // @ts-expect-error
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      // @ts-expect-error
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    )
    if (clicked !== null && index < clicked) {
      // @ts-expect-error
      ref.current.position.x = damp(
        // @ts-expect-error
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      )
    }
    if (clicked !== null && index > clicked) {
      // @ts-expect-error
      ref.current.position.x = damp(
        // @ts-expect-error
        ref.current.position.x,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        position[0] + 2,
        6,
        delta
      )
    }
    if (clicked === null || clicked === index) {
      // @ts-expect-error
      ref.current.position.x = damp(
        // @ts-expect-error
        ref.current.position.x,
        position[0],
        6,
        delta
      )
    }
    // @ts-expect-error
    ref.current.material.grayscale = damp(
      // @ts-expect-error
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    )
    // @ts-expect-error
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? 'white' : '#aaa'),
      hovered ? 0.3 : 0.1
    )
  })
  return (
    // @ts-expect-error
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
const Items = ({ w = 0.7, gap = 0.15 }): JSX.Element => {
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
        {urls.map((url, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 4, 1]}
            url={url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}

const ThreeSlider = (): JSX.Element => (
  <Canvas
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    onPointerMissed={() => (state.clicked = null)}
  >
    <Items />
  </Canvas>
)

export default ThreeSlider
