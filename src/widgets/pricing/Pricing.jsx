import React from 'react'
import styles from './Pricing.module.css'
import { formatCurrencyBRL, scrollToSection } from '../../shared/lib'
import { plans } from '../../entities/plan'

export default function Pricing({ onSelectPlan = ()=>{} }){
  return (
    <section id="preco" className={styles.section} aria-labelledby="pricing-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Escolha seu jeito de esquecer</span>
        <h2 id="pricing-title">Um plano para cada memória</h2>
      </div>
      <div className={styles.row}>
        {plans.map(p=> (
          <div key={p.id} className={`${styles.card} ${p.highlight?styles.popular:''}`}>
            {p.highlight && <div className={styles.badge}>Mais popular</div>}
            <h3>{p.name}</h3>
            <div className={styles.price}>{formatCurrencyBRL(p.price)}</div>
            <div className={styles.install}>{p.installments ? `${p.installments.count}x de ${formatCurrencyBRL(p.installments.amount)}` : ''}</div>
            {p.savingLabel && <div className={styles.saving}>{p.savingLabel}</div>}
            <ul className={styles.items}>
              {p.items.map(item => <li key={item}>{item}</li>)}
            </ul>
            <button onClick={()=>{ onSelectPlan(p.id); scrollToSection('lista') }} className={styles.cta}>Quero este plano</button>
          </div>
        ))}
      </div>
    </section>
  )
}
