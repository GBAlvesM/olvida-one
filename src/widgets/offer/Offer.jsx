import React from 'react'
import styles from './Offer.module.css'

export default function Offer(){
  return (
    <section id="offer" className={styles.section}>
      <h2>Oferta</h2>
      <div className={styles.box}>
        <div className={styles.price}>R$ 0 / mês</div>
        <p className={styles.desc}>Plano gratuito com funcionalidades essenciais — sem cartão.</p>
        <a className={styles.button} href="#signup" onClick={(e)=>{e.preventDefault(); alert('CTAs são funcionais no protótipo (mock).')}}>Começar grátis</a>
      </div>
    </section>
  )
}
