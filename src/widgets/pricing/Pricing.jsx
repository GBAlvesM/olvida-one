import React from 'react'
import styles from './Pricing.module.css'
import { scrollToSection } from '../../shared/lib/scrollToSection'

const PLANS = [
  {id:'solo', name:'Solo', price:'R$0', desc:'Para uso pessoal'},
  {id:'duo', name:'Duo', price:'R$9,90', desc:'Para duas pessoas — Mais popular', popular:true},
  {id:'pro', name:'Pro', price:'R$19,90', desc:'Recursos avançados'}
]

export default function Pricing({ onSelectPlan = ()=>{} }){
  return (
    <section id="preco" className={styles.section} aria-labelledby="pricing-title">
      <h2 id="pricing-title">Preço</h2>
      <div className={styles.row}>
        {PLANS.map(p=> (
          <div key={p.id} className={`${styles.card} ${p.popular?styles.popular:''}`}>
            {p.popular && <div className={styles.badge}>Mais popular</div>}
            <h3>{p.name}</h3>
            <div className={styles.price}>{p.price}</div>
            <p className={styles.desc}>{p.desc}</p>
            <button onClick={()=>{ onSelectPlan(p.id); scrollToSection('lista') }} className={styles.cta}>Escolher</button>
          </div>
        ))}
      </div>
    </section>
  )
}
