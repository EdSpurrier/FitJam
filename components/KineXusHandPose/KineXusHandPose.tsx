'use client'

import React, { CSSProperties, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './KineXusHandPose.module.css'
import { KineXusHandPoseProps } from './KineXusHandPose.types'
import KineXusEngine from '@/KineXusEngine'
import { Engine, Render, Bodies, World, Composite, Constraint, Body, MouseConstraint, Mouse } from 'matter-js'


const KineXusHandPose = ({
  children,
  className,
  style,
}: KineXusHandPoseProps) => {
  const scene = useRef<HTMLDivElement | null>(null)
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const [ mousePosition, setMousePosition ] = React.useState({ x: 0, y: 0 })
  const [ circle, setCircle ] = React.useState<Body | null>(null)

  const setStyles = (): CSSProperties => {
    return {
      ...style,
      /* Add Additional CSS Styles Here... */
    }
  }


  useEffect(() => {
    if (!scene.current) return
    
    const cw = scene.current?.clientWidth
    const ch = scene.current?.clientHeight

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


    // Set Scale for objects 
    var scale = 0.9;




    
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

  const mouseMove = e => {
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

    setMousePosition({ x: e.clientX, y: e.clientY });

    if (!circle) {
      console.log('MAKING CIRCLE');
      var mouseCircle = Bodies.circle( mousePosition.x, mousePosition.y, 50); // x, y, radius
      Body.setStatic(mouseCircle, true)
      World.add(engine.current.world, [mouseCircle]);
      setCircle(mouseCircle)
    }

    if (!circle) return;
    Body.setPosition(circle, { x: mousePosition.x, y: mousePosition.y });

  }

/*   useEffect(() => {
    if (!circle) {
      console.log('MAKING CIRCLE');
      var mouseCircle = Bodies.circle( mousePosition.x, mousePosition.y, 20); // x, y, radius
      Body.setStatic(mouseCircle, true)
      World.add(engine.current.world, [mouseCircle]);
      setCircle(mouseCircle)
    }

    if (!circle) return;
    Body.setPosition(circle, { x: mousePosition.x, y: mousePosition.y });


  }, [circle, mousePosition]) */

/* 
  // Update Mouse position
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!circle) return;

    Body.setPosition(circle, { x: mousePosition.x, y: mousePosition.y });
    };

    window.addEventListener('mousemove', handleMouseMove);


    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mousePosition, circle]) */

  return (
    <div 
      style={setStyles()}
      className={clsx( 
        styles.root,
        className,
        'border-2 border-green-500'
      )}
      onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={mouseMove}
    >

        <div ref={scene} style={{ width: 'calc( 100%  )', height: 'calc( 100vh - 150px )' }} />

    </div>
  )
}


export default KineXusHandPose