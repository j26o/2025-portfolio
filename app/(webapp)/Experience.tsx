"use client"

import { useEffect, useState } from 'react'

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
  Resize
} from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { useControls } from 'leva'

const Experience = () => {
  const [perfSucks, degrade] = useState(false)
  const { width, height } = useThree((state: { viewport: any }) => state.viewport)
  const margin = 0.5

  const { 
    camPos, 
    fov, 
    camFar, 
    camNear, 
    showPerf, 
    envColor, 
    nameColor,
  } = useControls({
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
    nameColor: 'rgb(255, 255, 255)',
    
  })

  const boundsGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boundsMaterial = new THREE.MeshStandardMaterial({ color: envColor })

  return (
    <>
      { showPerf && <Perf position="top-left" /> }
      <color attach="background" args={[envColor]} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <rectAreaLight args={['white', 3]} width={5} height={5} position={[-3, 4, 1]} visible={false} />
      <ambientLight intensity={0.4} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={ Math.PI / 2 } makeDefault />
      
      {/* 
        Stage
      */}
      <mesh 
        geometry={ boundsGeometry }
        material={ boundsMaterial }
        position={ [ 0, 0, 0 ] }
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

      <Caustics color={envColor} position={[0, -0.5, 0]} lightSource={[5, 5, -10]} worldRadius={0.01} ior={1.2} intensity={0.005}>
        
        <Text3D
          letterSpacing={-0.03} 
          size={0.8} 
          font="/fonts/Patua-One_Regular.json"
          castShadow
          receiveShadow
          position={[-3, 0.5, 0]}
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
      </Caustics>
    </>
  );
}

export default Experience;