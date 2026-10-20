import React from 'react'
import styles from './HowItWorks.module.css'

const STEPS = [
  {title:'Anotar rápido', desc:'Capture ideias e lembretes em segundos.'},
  {title:'Organizar', desc:'Etiquetas e prioridades simples.'},
  {title:'Revisar', desc:'Resumo diário para manter o foco.'}
]

export default function HowItWorks(){
  return (
    <section id="how" className={styles.section}>
      <h2>Como funciona</h2>
      <ol className={styles.list}>
        {STEPS.map(s=> (
          <li key={s.title} className={styles.item}>
            <strong>{s.title}</strong>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
