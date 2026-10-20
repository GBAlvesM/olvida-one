import React from 'react'
import styles from './Testimonials.module.css'

const TESTS = [
  {name:'Mariana, estudante', text:'Ajuda a organizar meus estudos sem distrações.'},
  {name:'Rafael, freelancer', text:'Simples e leve — ótimo para anotações rápidas.'},
  {name:'Luiza, designer', text:'O humor da copy já vale o teste. Leve e divertido.'},
  {name:'João, analista', text:'Surpreendentemente sutil — funciona como placebo bem-humorado.'}
]

export default function Testimonials(){
  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="testim-title">
      <h2 id="testim-title">O que dizem</h2>
      <div className={styles.meta}>Nota média <strong>4.8</strong></div>
      <div className={styles.note}>Depoimentos fictícios</div>
      <div className={styles.row}>
        {TESTS.map(t=> (
          <blockquote key={t.name} className={styles.card}>
            <p>“{t.text}”</p>
            <cite>{t.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
