import React from 'react'
import styles from './Hero.module.css'

export default function Hero(){
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1>Olvida One — Esqueça o que não precisa lembrar</h1>
        <p className={styles.lead}>Um gadget de bolso fictício que apaga, com consentimento, pequenas lembranças que atrapalham o dia: micos, spoilers e jingles.</p>
        <div className={styles.ctaRow}>
          <a className={styles.primary} href="#offer">Experimentar — R$0</a>
          <a className={styles.secondary} href="#how">Como funciona</a>
        </div>
      </div>
      <div className={styles.right} aria-hidden>
        <svg width="260" height="180" viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="260" height="180" rx="12" fill="#f1f6f8" />
          <rect x="16" y="20" width="120" height="18" rx="4" fill="#fff" />
          <rect x="16" y="48" width="220" height="12" rx="4" fill="#fff" />
          <rect x="16" y="68" width="180" height="12" rx="4" fill="#fff" />
          <rect x="16" y="96" width="220" height="40" rx="6" fill="#fff" />
        </svg>
      </div>
    </section>
  )
}
