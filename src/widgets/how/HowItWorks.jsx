import React from 'react'
import styles from './HowItWorks.module.css'

const STEPS = [
  {title:'Anotar rápido', desc:'Capture ideias e lembretes em segundos.'},
  {title:'Organizar', desc:'Etiquetas e prioridades simples.'},
  {title:'Revisar', desc:'Resumo diário para manter o foco.'}
]

export default function HowItWorks(){
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <h2 id="how-title">Como funciona</h2>
      <ol className={styles.list}>
        {STEPS.map((s,i)=> (
          <li key={s.title} className={styles.item}>
            <div className={styles.icon} aria-hidden>{i+1}</div>
            <div>
              <strong>{s.title}</strong>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
