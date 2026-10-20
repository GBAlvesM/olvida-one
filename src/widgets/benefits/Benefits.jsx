import React from 'react'
import styles from './Benefits.module.css'

const ITEMS = [
  {title:'Simplicidade', desc:'Interface limpa que exige poucos cliques.'},
  {title:'Privacidade', desc:'Dados ficam no seu dispositivo — sem nuvem pública.'},
  {title:'Foco', desc:'Ferramentas para organizar tarefas e revisar o que importa.'}
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
