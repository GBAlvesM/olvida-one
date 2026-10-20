import React from 'react'
import styles from './Testimonials.module.css'
import { testimonials } from '../../entities/testimonial'
import { product } from '../../entities/product'

function Stars({value}){
  const full = Math.round(value)
  return <span aria-hidden>{'★'.repeat(full)}{'☆'.repeat(5-full)}</span>
}

export default function Testimonials(){
  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="testim-title">
      <h2 id="testim-title">O que dizem</h2>
      <div className={styles.meta}>Nota média <strong>{product.rating}</strong> · {product.reviewsCount} avaliações (fictícias)</div>
      <div className={styles.note}>Depoimentos fictícios</div>
      <div className={styles.row}>
        {testimonials.map(t=> (
          <blockquote key={t.name} className={styles.card}>
            <p>“{t.text}”</p>
            <cite>{t.name} — {t.profile} <Stars value={t.rating} /></cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
