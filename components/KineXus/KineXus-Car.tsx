'use client'

import React, { CSSProperties, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './KineXus.module.css'
import { KineXusProps } from './KineXus.types'
import KineXusEngine from '@/KineXusEngine'
import { Engine, Render, Bodies, World, Composite, Constraint, Body, MouseConstraint, Mouse } from 'matter-js'


/**
* Creates a composite with simple car setup of bodies and constraints.
* @method car
* @param {number} xx
* @param {number} yy
* @param {number} width
* @param {number} height
* @param {number} wheelSize
* @return {composite} A new composite car body
*/
const car = function(xx: number, yy: number, width: number, height: number, wheelSize: number) {

  var group = Body.nextGroup(true),
      wheelBase = 20,
      wheelAOffset = -width * 0.5 + wheelBase,
      wheelBOffset = width * 0.5 - wheelBase,
      wheelYOffset = 0;

  var car = Composite.create({ label: 'Car' }),
      body = Bodies.rectangle(xx, yy, width, height, { 
          collisionFilter: {
              group: group
          },
          chamfer: {
              radius: height * 0.5
          },
          density: 0.0002
      });

  var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
          group: group
      },
      friction: 0.8
  });
              
  var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
          group: group
      },
      friction: 0.8
  });
              
  var axelA = Constraint.create({
      bodyB: body,
      pointB: { x: wheelAOffset, y: wheelYOffset },
      bodyA: wheelA,
      stiffness: 1,
      length: 0
  });
                  
  var axelB = Constraint.create({
      bodyB: body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
      bodyA: wheelB,
      stiffness: 1,
      length: 0
  });
  
  Composite.add(car, body);
  Composite.add(car, wheelA);
  Composite.add(car, wheelB);
  Composite.add(car, axelA);
  Composite.add(car, axelB);

  return car;
};


const KineXus = ({
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


// add bodies
World.add(engine.current.world, [
  // walls
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

// see car function defined later in this file
var scale = 0.9;
World.add(engine.current.world, car(150, 100, 150 * scale, 30 * scale, 30 * scale));


    // add bodies
    Composite.add(engine.current.world, [
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
  ]);

  // see car function defined later in this file
  var scale = 0.9;
  Composite.add(engine.current.world, car(150, 100, 150 * scale, 30 * scale, 30 * scale));
  
  scale = 0.8;
  Composite.add(engine.current.world, car(350, 300, 150 * scale, 30 * scale, 30 * scale));
  
  Composite.add(engine.current.world, [
      Bodies.rectangle(200, 150, 400, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' }}),
      Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' }}),
      Bodies.rectangle(300, 560, 600, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' }})
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

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


export default KineXus