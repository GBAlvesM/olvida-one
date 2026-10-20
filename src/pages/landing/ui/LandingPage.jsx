import React from 'react'
import SiteHeader from '../../../widgets/site-header/SiteHeader'
import Hero from '../../../widgets/hero/Hero'
import Benefits from '../../../widgets/benefits/Benefits'
import HowItWorks from '../../../widgets/how/HowItWorks'
import ProductSection from '../../../widgets/product/ProductSection'
import MemoryDemo from '../../../widgets/memory-demo/MemoryDemo'
import Testimonials from '../../../widgets/testimonials/Testimonials'
import Pricing from '../../../widgets/pricing/Pricing'
import { scrollToSection } from '../../../shared/lib/scrollToSection'
import FAQ from '../../../widgets/faq/FAQ'
import Waitlist from '../../../widgets/waitlist/Waitlist'
import styles from './LandingPage.module.css'
import SiteFooter from '../../../widgets/site-footer/SiteFooter'

export default function LandingPage(){
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <ProductSection />
        <MemoryDemo />
        <Testimonials />
        <Pricing onSelectPlan={()=>{ scrollToSection('lista') }} />
        <FAQ />
        <Waitlist />
      </main>

      <SiteFooter />
    </div>
  )
}
