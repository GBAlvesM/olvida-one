import React from 'react'
import styles from './Testimonials.module.css'

const TESTS = [
  {name:'Mariana, estudante', text:'Ajuda a organizar meus estudos sem distrações.'},
  {name:'Rafael, freelancer', text:'Simples e leve — ótimo para anotações rápidas.'}
]

export default function Testimonials(){
  return (
    <section className={styles.section}>
      <h2>O que dizem</h2>
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
