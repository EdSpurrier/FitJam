'use client'

import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './KineXus.module.css'
import { KineXusProps } from './KineXus.types'

const KineXus = ({
  children,
  className,
  style,
}: KineXusProps) => {

  const setStyles = (): CSSProperties => {
    return {
      ...style,
      /* Add Additional CSS Styles Here... */
    }
  }

  return (
    <div 
      style={setStyles()}
      className={clsx( 
        styles.root,
        className
      )}
    >
      KineXus
      {children}
    </div>
  )
}


export default KineXus