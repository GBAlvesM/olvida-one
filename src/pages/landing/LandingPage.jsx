import React from 'react'
import Hero from '../../widgets/hero/Hero'
import Benefits from '../../widgets/benefits/Benefits'
import HowItWorks from '../../widgets/how/HowItWorks'
import Testimonials from '../../widgets/testimonials/Testimonials'
import Offer from '../../widgets/offer/Offer'
import FAQ from '../../widgets/faq/FAQ'
import styles from './LandingPage.module.css'

export default function LandingPage(){
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Olvida</div>
        <nav>
          <a href="#benefits">Benefícios</a> | <a href="#how">Como funciona</a> | <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Offer />
        <FAQ />
      </main>

      <footer className={styles.footer}>© 2026 Olvida — Protótipo acadêmico</footer>
    </div>
  )
}
