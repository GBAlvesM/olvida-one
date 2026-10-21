import React, { useEffect, useRef, useId } from 'react'
import styles from './ProductDevice.module.css'

export default function ProductDevice({ color, activeMode = 'cringe', glow = false, className = '' }) {
  const rootRef = useRef(null)
  const deviceId = useId().replace(/:/g, '')

  useEffect(() => {
    const device = rootRef.current
    if (!device) return undefined

    if (!glow) {
      device.classList.remove(styles.flash)
      return undefined
    }

    device.classList.remove(styles.flash)
    // Reflow restarts the single 600 ms pulse when glow is triggered again.
    void device.offsetWidth
    device.classList.add(styles.flash)

    const timeoutId = window.setTimeout(() => {
      device.classList.remove(styles.flash)
    }, 650)

    return () => {
      window.clearTimeout(timeoutId)
      device.classList.remove(styles.flash)
    }
  }, [glow])

  return (
    <div
      ref={rootRef}
      className={`${styles.wrap} ${className}`}
      style={color ? { '--device-color': color } : undefined}
    >
      <svg className={styles.deviceSvg} viewBox="0 0 160 640" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={`${deviceId}-shell`} x1="20" y1="20" x2="146" y2="615" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--device-color)" />
            <stop offset="0.48" stopColor="var(--device-color)" />
            <stop offset="1" stopColor="#080D1B" />
          </linearGradient>
          <linearGradient id={`${deviceId}-edge`} x1="12" y1="70" x2="150" y2="570" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.26" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.02" />
            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id={`${deviceId}-lens`} cx="0" cy="0" r="1" gradientTransform="translate(80 117) rotate(90) scale(37)" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="0.22" stopColor="var(--color-primary)" />
            <stop offset="0.68" stopColor="#12B7D0" />
            <stop offset="1" stopColor="#17203A" />
          </radialGradient>
          <filter id={`${deviceId}-lens-glow`} x="24" y="60" width="112" height="112" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* A long, rounded body gives the device its own capsule silhouette. */}
        <rect x="12" y="10" width="136" height="620" rx="68" fill={`url(#${deviceId}-shell)`} />
        <rect x="15" y="13" width="130" height="614" rx="65" stroke={`url(#${deviceId}-edge)`} strokeWidth="2" />
        <path d="M31 72C31 52 47 36 67 36" stroke="white" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 188V436" stroke="white" strokeOpacity=".08" strokeWidth="2" strokeLinecap="round" />

        {/* Single front lens and soft cyan halo. */}
        <circle cx="80" cy="117" r="36" fill="var(--color-primary)" opacity=".36" filter={`url(#${deviceId}-lens-glow)`} />
        <circle cx="80" cy="117" r="30" fill="#080D1B" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
        <circle cx="80" cy="117" r="23" fill={`url(#${deviceId}-lens)`} />
        <circle cx="73" cy="109" r="5" fill="white" opacity=".84" />
        <circle cx="80" cy="117" r="16" stroke="white" strokeOpacity=".45" />

        {/* Three-segment status bar: only the selected memory mode is illuminated. */}
        <rect x="69" y="234" width="22" height="104" rx="11" fill="#080D1B" fillOpacity=".75" stroke="white" strokeOpacity=".08" />
        <rect className={activeMode === 'cringe' ? styles.segmentActive : styles.segment} x="75" y="246" width="10" height="24" rx="5" />
        <rect className={activeMode === 'spoiler' ? styles.segmentActive : styles.segment} x="75" y="275" width="10" height="24" rx="5" />
        <rect className={activeMode === 'jingle' ? styles.segmentActive : styles.segment} x="75" y="304" width="10" height="24" rx="5" />

        {/* A rotary dial with three tactile marks close to the base. */}
        <circle cx="80" cy="516" r="37" fill="#070B16" fillOpacity=".58" stroke="white" strokeOpacity=".16" strokeWidth="2" />
        <circle cx="80" cy="516" r="28" fill="var(--color-surface-2)" stroke="var(--color-primary)" strokeOpacity=".3" strokeWidth="1.5" />
        <path d="M80 486V497" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 531L64 525" stroke="var(--color-text-muted)" strokeWidth="3" strokeLinecap="round" />
        <path d="M106 531L96 525" stroke="var(--color-text-muted)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="516" r="7" fill="var(--color-accent)" />
      </svg>
      <div className={styles.glow} aria-hidden="true" />
    </div>
  )
}
