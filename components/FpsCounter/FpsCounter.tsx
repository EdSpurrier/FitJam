'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './FpsCounter.module.css'
import { FpsCounterProps } from './FpsCounter.types'
import { useAnimationFrame } from '@/lib/hooks/useAnimationFrame'

const FpsCounter = ({
  children,
  className,
}: FpsCounterProps) => {
  const [fps, setFps] = useState(0);
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useAnimationFrame((delta: number) => {
      setFps(() => Math.floor(1000 / delta));
      setCount(prev => prev + 1);
  }, animate);
  
  return (
      <div className={clsx(styles.root, className)}>
          <span>{fps} FPS, {count}</span>
          <button onClick={() => setAnimate(!animate)}>Toggle</button>
      </div>
  )
}


export default FpsCounter