import React from 'react'
import styles from './Waitlist.module.css'
import { WaitlistForm } from '../../features/waitlist-signup'

export default function Waitlist({ selectedPlanId, onPlanChange }){
  return (
    <section id="lista" className={styles.section} aria-labelledby="waitlist-title">
      <div className={styles.intro}>
        <span className={styles.kicker}>O próximo passo é seu</span>
        <h2 id="waitlist-title">Entre na lista de espera</h2>
        <p>Escolha seu plano de interesse. A lista é uma simulação local: seus dados não saem desta página.</p>
      </div>
      <WaitlistForm selectedPlanId={selectedPlanId} onPlanChange={onPlanChange} />
    </section>
  )
}
