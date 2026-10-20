import React from 'react'
import Hero from '../../../widgets/hero/Hero'
import Benefits from '../../../widgets/benefits/Benefits'
import HowItWorks from '../../../widgets/how/HowItWorks'
import Testimonials from '../../../widgets/testimonials/Testimonials'
import Offer from '../../../widgets/offer/Offer'
import FAQ from '../../../widgets/faq/FAQ'
import Modes from '../../../widgets/modes/Modes'
import ProductSection from '../../../widgets/product/ProductSection'
import styles from './LandingPage.module.css'

export default function LandingPage(){
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Olvida One</div>
        <nav>
          <a href="#benefits">Benefícios</a> | <a href="#how">Como funciona</a> | <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main>
        <Hero />
        <ProductSection />
        <Modes />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Offer />
        <FAQ />
      </main>

      <footer className={styles.footer}>
        © 2026 Olvida One — Protótipo acadêmico
        <div className={styles.disclaimer}>Produto fictício. Nada é vendido nem coletado. Uso por escolha do usuário.</div>
      </footer>
    </div>
  )
}
