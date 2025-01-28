"use client"
import { useSearchParams  } from 'next/navigation'
import { useMemo } from 'react'

import { Canvas } from "@react-three/fiber"
import styles from "./page.module.css"
import Experience from "./Experience"
import { Leva } from "leva"

export default function Home() {
  const searchParams = useSearchParams()
  const showDebug = useMemo(() => searchParams.get('debug') !== 'true', [searchParams])

  return (
    <main className={`${styles.main} w-full h-full`}>
      <header className={styles.header}>
        {/* <h1 className={styles.h1}>roland baldovino</h1> */}
      </header>
      <Leva hidden={showDebug} />
      <div className={`${styles.experience} w-full h-full`}>
        <Canvas 
          shadows 
          gl={{ antialias: true }} 
          dpr={[1, 1.5]} 
          camera={
            { 
              position: [0, 0, 5], 
              fov: 60 
            }
          }
        >
          <Experience />
        </Canvas>
      </div>
    </main>
  );
}
