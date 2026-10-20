import React from 'react'
import styles from './Hero.module.css'
import ProductDevice from '../product/ProductDevice'
import { scrollToSection } from '../../shared/lib/scrollToSection'

export default function Hero(){
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.left}>
        <h1 id="hero-title">Olvida One — Esqueça o que não precisa lembrar</h1>
        <p className={styles.lead}>Um gadget de bolso fictício que apaga, com consentimento, pequenas lembranças que atrapalham o dia: micos, spoilers e jingles.</p>
        <div className={styles.ctaRow}>
          <button className={styles.primary} onClick={()=>scrollToSection('lista')}>Entrar na lista de espera</button>
          <button className={styles.secondary} onClick={()=>scrollToSection('demo')}>Testar o esquecimento</button>
        </div>
        <div className={styles.seal}>★ 4,8 · 1.274 avaliações fictícias</div>
      </div>
      <div className={styles.right} aria-hidden>
        <div className={styles.deviceFloat}>
          <ProductDevice color="var(--device-color)" glow={false} />
        </div>
      </div>
    </section>
  )
}
