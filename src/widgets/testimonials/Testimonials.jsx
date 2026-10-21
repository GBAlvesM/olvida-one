import React from 'react'
import styles from './Testimonials.module.css'
import { testimonials } from '../../entities/testimonial'
import { product } from '../../entities/product'

function Stars({value}){
  const full = Math.round(value)
  return <span className={styles.stars} role="img" aria-label={`${value} de 5 estrelas`}>{'★'.repeat(full)}{'☆'.repeat(5-full)}</span>
}

export default function Testimonials(){
  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="testim-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>Histórias do universo Olvida</span>
          <h2 id="testim-title">O que dizem por aí</h2>
        </div>
        <div className={styles.ratingSummary}>
          <Stars value={product.rating} />
          <strong>{product.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} / 5</strong>
          <span>{product.reviewsCount.toLocaleString('pt-BR')} avaliações fictícias</span>
        </div>
      </div>
      <div className={styles.note}>Depoimentos fictícios</div>
      <div className={styles.row}>
        {testimonials.map(t=> (
          <blockquote key={t.name} className={styles.card}>
            <Stars value={t.rating} />
            <p>“{t.text}”</p>
            <cite><strong>{t.name}</strong><span>{t.profile}</span></cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
