import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './utils/Minimap'
import { state, damp } from './utils/util'

const urls = [
  'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/25/7c/f2/257cf2e2-6c7a-3212-1b27-a684cf85a62c/196589083906.jpg/600x600bb.png',
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/31/0c/32/310c329e-996e-d505-335e-a488e4e68450/4050538854701.jpg/600x600bb.png',
  'https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/ae/a6/bd/aea6bd15-6642-7568-d10b-99f77e4b29ff/093624874843.jpg/600x600bb.png',
  'https://is3-ssl.mzstatic.com/image/thumb/Music116/v4/a1/47/ba/a147ba91-31cd-ef4d-d785-040036d14598/12CMGIM34362.rgb.jpg/600x600bb.png',
  'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/1c/4b/6d/1c4b6d25-32cc-978f-e166-aaf1926aa9e2/22BMR0003639.rgb.jpg/600x600bb.png',
  'https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/9c/63/30/9c63308f-0213-372c-456e-b76b135c47a9/196925187732.jpg/600x600bb.png',
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/91/03/14/9103142e-9c42-3658-4d89-5f786ec5fdf1/196589142092.jpg/600x600bb.png',
  'https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.png',
  'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/55/dd/ab/55ddab67-26ec-e244-2c37-37f92b63bf19/196589366870.jpg/600x600bb.png'
]

const Item = ({
  // eslint-disable-next-line react/prop-types
  index,
  // eslint-disable-next-line react/prop-types
  position,
  // eslint-disable-next-line react/prop-types
  scale,
  // eslint-disable-next-line react/prop-types
  c = new THREE.Color(),
  ...props
}): JSX.Element => {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked } = useSnapshot(state)
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
