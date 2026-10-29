import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import { useEscapeKey } from '../lib/useEscapeKey'

export default function Modal({ children, onClose, labelledBy, returnFocusRef }){
  const ref = useRef(null)
  // close on escape
  useEscapeKey(()=> onClose && onClose())

  useEffect(()=>{
    const prevOverflow = document.body.style.overflow
    const previousActive = document.activeElement
    document.body.style.overflow = 'hidden'
    // focus management: focus first focusable button inside modal
    const btn = ref.current && ref.current.querySelector('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])')
    if(btn) btn.focus()
    return ()=>{
      document.body.style.overflow = prevOverflow
      // Async dialogs may open after the submit button loses focus; prefer the explicit trigger.
      const returnFocus = returnFocusRef?.current || previousActive
      if (returnFocus?.isConnected && returnFocus.focus) returnFocus.focus()
    }
  },[returnFocusRef])

  function handleKeyDown(event) {
    if (event.key !== 'Tab' || !ref.current) return

    const focusable = Array.from(ref.current.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    ))
    if (!focusable.length) {
      event.preventDefault()
      ref.current.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={(event)=>{ if(event.target === event.currentTarget) onClose && onClose() }}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      tabIndex={-1}
    >
      <div className={styles.box} ref={ref}>{children}</div>
    </div>
  )
}
