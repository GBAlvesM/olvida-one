import React, {useEffect, useRef} from 'react'
import styles from './ProductDevice.module.css'

// Props:
// - color: CSS color via --device-color
// - activeMode: 'cringe' | 'spoiler' | 'jingle'
// - glow: boolean (triggers a single flash animation)
// - className
export default function ProductDevice({ color, activeMode = 'cringe', glow = false, className = '' }){
  const rootRef = useRef(null)

  // toggle a class to trigger the flash once when glow toggles true
  useEffect(()=>{
    const el = rootRef.current
    if(!el) return
    if(glow){
      el.classList.remove(styles.flash)
      // force reflow to restart animation
      void el.offsetWidth
      el.classList.add(styles.flash)
      // remove after animation ends (600ms)
      const t = setTimeout(()=> el.classList.remove(styles.flash), 700)
      return ()=>clearTimeout(t)
    }
  },[glow])

  return (
    <div ref={rootRef} className={`${styles.wrap} ${className}`} style={{ ['--device-color']: color }}>
      <svg width="140" height="380" viewBox="0 0 140 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Body capsule */}
        <rect x="6" y="6" width="128" height="368" rx="64" fill="var(--device-color)" stroke="rgba(255,255,255,0.04)" />

        {/* Lens at top */}
        <g transform="translate(70,70)">
          <circle r="28" fill="black" opacity="0.12" />
          <circle r="22" fill="var(--color-primary)" />
          <circle r="12" fill="var(--color-flash)" opacity="0.18" />
        </g>

        {/* Vertical light bar with 3 segments */}
        <g transform="translate(70,150)" style={{transformOrigin:'70px 150px'}}>
          <rect x="-6" y="-70" width="12" height="34" rx="6" fill={activeMode==='cringe' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'} />
          <rect x="-6" y="-12" width="12" height="34" rx="6" fill={activeMode==='spoiler' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'} />
          <rect x="-6" y="46" width="12" height="34" rx="6" fill={activeMode==='jingle' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'} />
        </g>

        {/* Dial near base */}
        <g transform="translate(70,300)">
          <circle r="28" fill="rgba(0,0,0,0.12)" />
          <circle r="22" fill="var(--color-surface-2)" />
          {/* three marks */}
          <g>
            <rect x="-2" y="-20" width="4" height="8" rx="2" fill="var(--color-text)" transform="rotate(0)" />
            <rect x="-2" y="-20" width="4" height="8" rx="2" fill="var(--color-text)" transform="rotate(120)" />
            <rect x="-2" y="-20" width="4" height="8" rx="2" fill="var(--color-text)" transform="rotate(240)" />
          </g>
        </g>
      </svg>
      {/* decorative small glow when flash active */}
      <div className={styles.glow} aria-hidden />
    </div>
  )
}
