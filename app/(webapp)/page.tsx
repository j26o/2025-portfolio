"use client"

import styles from "./page.module.css"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import { Perf } from 'r3f-perf'

export default function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.canvas}>
        <h1 className={styles.h1}>Welcome to the portfolio of Roland Baldovino</h1>
        <Canvas>
          <Perf position="top-left" />
          <OrbitControls />
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhongMaterial />
          </mesh>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} color="red" />
        </Canvas>
      </main>
    </div>
  );
}
