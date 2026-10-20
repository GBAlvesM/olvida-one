import React from 'react'
import styles from './Benefits.module.css'

const ITEMS = [
  {title:'Simplicidade', desc:'Interface limpa que exige poucos cliques.'},
  {title:'Consentimento', desc:'O aparelho só afeta quem o usa — apagar é sempre por escolha do usuário.'},
  {title:'Foco', desc:'Remove pequenas distrações (mico, spoiler, jingle) para ajudar no dia a dia.'},
  {title:'Portátil', desc:'Design de bolso, leve e discreto.'},
  {title:'Sem coleta', desc:'Nenhum dado é enviado — protótipo sem armazenamento.'},
  {title:'Rápido', desc:'Pulso suave que não interrompe o fluxo do seu dia.'}
]

export default function Benefits(){
  return (
    <section id="beneficios" className={styles.section} aria-labelledby="beneficios-title">
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
      <div className={styles.stats}>
        <div className={styles.stat}><strong>1.274</strong><span>usuários (fictício)</span></div>
        <div className={styles.stat}><strong>4.8</strong><span>nota média</span></div>
        <div className={styles.stat}><strong>3</strong><span>modos</span></div>
      </div>
    </section>
  )
}
