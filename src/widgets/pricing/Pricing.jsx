import React from 'react'
import styles from './Pricing.module.css'
import { scrollToSection } from '../../shared/lib/scrollToSection'
import { plans } from '../../entities/plan'
import { formatCurrencyBRL } from '../../shared/lib/formatCurrency'

export default function Pricing({ onSelectPlan = ()=>{} }){
  return (
    <section id="preco" className={styles.section} aria-labelledby="pricing-title">
      <h2 id="pricing-title">Preço</h2>
      <div className={styles.row}>
        {plans.map(p=> (
          <div key={p.id} className={`${styles.card} ${p.highlight?styles.popular:''}`}>
            {p.highlight && <div className={styles.badge}>Mais popular</div>}
            <h3>{p.name}</h3>
            <div className={styles.price}>{formatCurrencyBRL(p.price)}</div>
            <p className={styles.desc}>{p.items.join(' · ')}</p>
            <div className={styles.install}>{p.installments ? `${p.installments.count}x de ${formatCurrencyBRL(p.installments.amount)}` : ''}</div>
            {p.savingLabel && <div className={styles.saving}>{p.savingLabel}</div>}
            <button onClick={()=>{ onSelectPlan(p.id); scrollToSection('lista') }} className={styles.cta}>Escolher</button>
          </div>
        ))}
      </div>
    </section>
  )
}
