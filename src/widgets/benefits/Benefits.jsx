import React from 'react'
import styles from './Benefits.module.css'

const ITEMS = [
  {title:'Simplicidade', desc:'Interface limpa que exige poucos cliques.'},
  {title:'Consentimento', desc:'O aparelho só afeta quem o usa — apagar é sempre por escolha do usuário.'},
  {title:'Foco', desc:'Remove pequenas distrações (mico, spoiler, jingle) para ajudar no dia a dia.'}
]

export default function Benefits(){
  return (
    <section id="benefits" className={styles.section}>
      <h2>Benefícios</h2>
      <div className={styles.grid}>
        {ITEMS.map(i=> (
          <div key={i.title} className={styles.card}>
            <div className={styles.icon} aria-hidden>✓</div>
            <h3>{i.title}</h3>
            <p>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
