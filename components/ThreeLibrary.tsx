import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Environment
} from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398875

// eslint-disable-next-line react/prop-types
const ThreeLibrary = ({ images }) => {
  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
    >
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          {
            // @ts-expect-error
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          }
        </mesh>
      </group>
    </Canvas>
  )
}

const Frames = ({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3()
}) => {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    // @ts-expect-error
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      // @ts-expect-error
      clicked.current.parent.updateWorldMatrix(true, true)
      // @ts-expect-error
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      // @ts-expect-error
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state) => {
    state.camera.position.lerp(p, 0.025)
    state.camera.quaternion.slerp(q, 0.025)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? '/' : '/item/' + e.object.name
        )
      )}
      onPointerMissed={() => setLocation('/')}
    >
      {images.map((props: any) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  )
}

const Frame = ({ url, c = new THREE.Color(), ...props }) => {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const frame = useRef()
  const name = getUuid(url)
  useCursor(hovered)
  useFrame((state) => {
    // @ts-expect-error
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    // @ts-expect-error
    image.current.scale.x = THREE.MathUtils.lerp(
      // @ts-expect-error
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    )
    // @ts-expect-error
    image.current.scale.y = THREE.MathUtils.lerp(
      // @ts-expect-error
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    )
    // @ts-expect-error
    frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white'), 0.1)
  })
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        {
          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={url}
          />
        }
      </mesh>
    </group>
  )
}

export default ThreeLibrary
