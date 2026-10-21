import React from 'react'
import styles from './Hero.module.css'
import { scrollToSection } from '../../shared/lib'
import { ProductDevice, product } from '../../entities/product'

export default function Hero(){
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.left}>
        <div className={styles.eyebrow}><span /> {product.name} · gadget pessoal de bolso</div>
        <h1 id="hero-title">{product.slogan}</h1>
        <p className={styles.lead}>{product.tagline}</p>
        <div className={styles.ctaRow}>
          <button className={styles.primary} onClick={()=>scrollToSection('lista')}>Entrar na lista de espera</button>
          <button className={styles.secondary} onClick={()=>scrollToSection('demo')}>Testar o esquecimento</button>
        </div>
        <div className={styles.socialProof}>
          <span className={styles.stars} aria-label="5 de 5 estrelas">★★★★★</span>
          <span><strong>4,8</strong> · 1.274 avaliações fictícias</span>
        </div>
      </div>
      <div className={styles.right} aria-hidden>
        <div className={styles.aura} />
        <div className={styles.deviceFloat}>
          <ProductDevice className={styles.heroDevice} />
        </div>
        <div className={styles.callout}><span>01</span> Um flash suave. Só seu.</div>
      </div>
    </section>
  )
}
