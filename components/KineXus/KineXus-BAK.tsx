'use client'

import React, { CSSProperties, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './KineXus.module.css'
import { KineXusProps } from './KineXus.types'
import KineXusEngine from '@/KineXusEngine'
import { Engine, Render, Bodies, World } from 'matter-js'


const KineXusBak = ({
  className,
  style,
}: KineXusProps) => {
  const scene = useRef<HTMLDivElement | null>(null)
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const setStyles = (): CSSProperties => {
    return {
      ...style,
      /* Add Additional CSS Styles Here... */
    }
  }

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

    Engine.run(engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world, true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Engine.clear(engine.current)
      render.canvas.remove()
      render.textures = {}
    }
  }, [])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div 
      style={setStyles()}
      className={clsx( 
        styles.root,
        className
      )}
      onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={handleAddCircle}
    >

        <div ref={scene} style={{ width: '100vw', height: 'calc( 100vh - 40px)' }} />

    </div>
  )
}


export default KineXusBak