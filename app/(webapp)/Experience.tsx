"use client"

import { memo, useRef, forwardRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Text3D, 
  Caustics,
  MeshTransmissionMaterial,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Resize,
  useGLTF,
  CameraControls,
} from '@react-three/drei'

import { 
  useControls, 
  button, 
  buttonGroup, 
  folder 
} from 'leva'

import { Perf } from 'r3f-perf'

const Experience = () => {
  const { width, height } = useThree((state: { viewport: any }) => state.viewport)
  const { camera } = useThree()
  const cameraControlsRef = useRef()
  const meshRef = useRef()
  const { DEG2RAD } = THREE.MathUtils

  const { 
    showPerf, 
    envColor, 
    nameColor,
    minDistance,
    verticalDragToForward,
    dollyToCursor,
    infinityDolly
  } = useControls({
    colors: folder(
      {
        envColor: { value: 'rgb(255, 255, 255)', label: 'env color' },
        nameColor: { value: 'rgb(255, 255, 255)', label: 'name color' }
      },
      { collapsed: true}
    ),
    showPerf: { value: false, label: 'show performance' },
    // envColor: 'rgb(255, 255, 255)',
    // nameColor: 'rgb(255, 255, 255)',
    minDistance: { value: 0 },
    moveTo: folder(
      {
        vec1: { value: [3, 5, 2], label: 'vec' },
        'moveTo(…vec)': button((get) => cameraControlsRef.current?.moveTo(...get('moveTo.vec1'), true))
      },
      { collapsed: true }
    ),
    'fitToBox(mesh)': button(() => cameraControlsRef.current?.fitToBox(meshRef.current, true)),
    setPosition: folder(
      {
        vec2: { value: [-5, 2, 1], label: 'vec' },
        'setPosition(…vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2'), true))
      },
      { collapsed: true }
    ),
    setTarget: folder(
      {
        vec3: { value: [3, 0, -3], label: 'vec' },
        'setTarget(…vec)': button((get) => cameraControlsRef.current?.setTarget(...get('setTarget.vec3'), true))
      },
      { collapsed: true }
    ),
    setLookAt: folder(
      {
        vec4: { value: [1, 2, 3], label: 'position' },
        vec5: { value: [1, 1, 0], label: 'target' },
        'setLookAt(…position, …target)': button((get) => cameraControlsRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
      },
      { collapsed: true }
    ),
    lerpLookAt: folder(
      {
        vec6: { value: [-2, 0, 0], label: 'posA' },
        vec7: { value: [1, 1, 0], label: 'tgtA' },
        vec8: { value: [0, 2, 5], label: 'posB' },
        vec9: { value: [-1, 0, 0], label: 'tgtB' },
        t: { value: Math.random(), label: 't', min: 0, max: 1 },
        'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
          return cameraControlsRef.current?.lerpLookAt(
            ...get('lerpLookAt.vec6'),
            ...get('lerpLookAt.vec7'),
            ...get('lerpLookAt.vec8'),
            ...get('lerpLookAt.vec9'),
            get('lerpLookAt.t'),
            true
          )
        })
      },
      { collapsed: true }
    ),
    reset: button(() => cameraControlsRef.current?.reset(true)),
  })

  useEffect(() => {
    console.log(cameraControlsRef.current)
  }, [])
  

  const boundsGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boundsMaterial = new THREE.MeshStandardMaterial({ color: envColor })

  return (
    <>
      { showPerf && <Perf position="top-left" /> }
      <color attach="background" args={[envColor]} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <rectAreaLight args={['white', 3]} width={5} height={5} position={[-3, 4, 1]} visible={false} />
      <ambientLight intensity={0.4} />
      {/* <OrbitControls minPolarAngle={0} maxPolarAngle={ Math.PI / 2 } makeDefault /> */}
      <CameraControls
        ref={cameraControlsRef}
        minDistance={minDistance}
        verticalDragToForward={verticalDragToForward}
        dollyToCursor={dollyToCursor}
        infinityDolly={infinityDolly}
      />
      {/* 
        Stage
      */}
      <mesh 
        geometry={ boundsGeometry }
        material={ boundsMaterial }
        position={ [ 0, -0.04, 0 ] }
        scale={ [ 8, 0.01, 8 ] }
        receiveShadow 
      />
      <mesh 
        geometry={ boundsGeometry } 
        material={ boundsMaterial } 
        position={ [ 0, 4, -4 ] } 
        scale={ [ 8, 8, 0.01 ] }  
        receiveShadow 
      />

      <Text3D
      ref={ meshRef }
        letterSpacing={-0.03} 
        size={0.8} 
        font="/fonts/Patua-One_Regular.json"
        castShadow
        receiveShadow
        position={[-3, 0, 0]}
        // height={ 0.2 }
        curveSegments={ 16 }
        bevelEnabled
        bevelThickness={ 0.08 }
        // bevelSize={ 0 }
        // bevelOffset={ 0 }
        // bevelSegments={ 2 }
      >
        ro baldovino
        <MeshTransmissionMaterial resolution={1024} distortion={0.3} color={nameColor} thickness={1} anisotropy={1} />
      </Text3D>
    </>
  );
}

export default Experience;