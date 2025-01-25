"use client"

import { useEffect, useState } from 'react'

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, CameraControls, Center, Text3D } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { useControls } from 'leva'

const Experience = () => {
  const [perfSucks, degrade] = useState(false)
  const { width, height } = useThree((state: { viewport: any }) => state.viewport)
  const margin = 0.5

  const { camPos, fov, showPerf, envColor, camFar, camNear } = useControls({
    showPerf: true,
    camPos: {
        value: {
            x: 0,
            y: 3,
            z: 25
        },
        step: 0.1
    },
    fov: {
        value: 35,
        step: 0.1,
    },
    camFar: 400,
    camNear: 0.1,
    envColor: 'rgb(255, 255, 255)',
    
  })

  useFrame(({ camera }, delta) => {
    // Update camera position
    // camera.position.set(camPos.x, camPos.y, camPos.z)
    
    // Update camera properties
    // camera.fov = fov
    // camera.near = camNear
    // camera.far = camFar
    
    // Important: Need to update projection matrix when changing these properties
    // camera.updateProjectionMatrix()
  }, [])

  return (
    <>
      { showPerf && <Perf position="top-left" /> }
      
      <OrbitControls />
      {/* <CameraControls /> */}
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <Environment preset="city" background blur={1} />
      <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />

      <Center rotation={[0, -0.25, 0]}>
        <Text3D
          letterSpacing={-0.1} 
          size={3.3} 
          font="/fonts/Patua-One_Regular.json"
          castShadow={true}
          height={ 0.2 }
          curveSegments={ 12 }
          bevelEnabled
          bevelThickness={ 0.08 }
          bevelSize={ 0.02 }
          bevelOffset={ 0 }
          bevelSegments={ 5 }
          // font="/fonts/helvetiker_regular.typeface.json"
        >
          ro baldovino
          <meshStandardMaterial color={envColor} />
        </Text3D>
      </Center>
      
      {/* <mesh position={[0, 0, 0]} castShadow={true}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color={envColor}
          transparent={true} 
        />
      </mesh> */}
    </>
  );
}

export default Experience;