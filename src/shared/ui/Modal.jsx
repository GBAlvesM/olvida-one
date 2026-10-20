import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import { useEscapeKey } from '../lib/useEscapeKey'

export default function Modal({ children, onClose, labelledBy }){
  const ref = useRef(null)
  // close on escape
  useEscapeKey(()=> onClose && onClose())

  useEffect(()=>{
    const prevOverflow = document.body.style.overflow
    const previousActive = document.activeElement
    document.body.style.overflow = 'hidden'
    // focus management: focus first focusable button inside modal
    const btn = ref.current && ref.current.querySelector('button, [tabindex]:not([tabindex="-1"])')
    if(btn) btn.focus()
    return ()=>{
      document.body.style.overflow = prevOverflow
      // restore focus to previous active element if possible
      try {
        if(previousActive && previousActive.focus) previousActive.focus()
      } catch (err) {
        // ignore focus restore errors
      }
    }
  },[])

  return (
    <div className={styles.backdrop} onClick={(e)=>{ if(e.target === e.currentTarget) onClose && onClose() }} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className={styles.box} ref={ref}>{children}</div>
    </div>
  )
}
