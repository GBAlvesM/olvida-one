import React, { useState } from 'react'
import SiteHeader from '../../../widgets/site-header'
import Hero from '../../../widgets/hero'
import Benefits from '../../../widgets/benefits'
import HowItWorks from '../../../widgets/how'
import ProductSection from '../../../widgets/product'
import MemoryDemo from '../../../widgets/memory-demo'
import Testimonials from '../../../widgets/testimonials'
import Pricing from '../../../widgets/pricing'
import FAQ from '../../../widgets/faq'
import Waitlist from '../../../widgets/waitlist'
import styles from './LandingPage.module.css'
import SiteFooter from '../../../widgets/site-footer'

export default function LandingPage(){
  const [selectedPlanId, setSelectedPlanId] = useState('solo')

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
        <Pricing onSelectPlan={setSelectedPlanId} />
        <FAQ />
        <Waitlist selectedPlanId={selectedPlanId} onPlanChange={setSelectedPlanId} />
      </main>

      <SiteFooter />
    </div>
  )
}
