import React from 'react'
import styles from './Benefits.module.css'

const ITEMS = [
  {title:'Esquecimento seletivo', desc:'Só apaga o que você escolher. Nada além do modo selecionado.'},
  {title:'Só funciona em você', desc:'Consentimento de fábrica: o flash não faz nada em ninguém que não seja o dono.'},
  {title:'Cabe no bolso', desc:'14 cm e 38 g. Mais leve que o seu cartão de fidelidade acumulado.'},
  {title:'30 dias de bateria', desc:'Carregou uma vez, esqueceu o carregador. (Combina.)'},
  {title:'Flash suave e único', desc:'Um pulso de luz delicado. Sem estrobo, sem drama.'},
  {title:'Garantia de esquecimento', desc:'Se você lembrar, devolvemos o dinheiro. Se esquecer que comprou, também.'}
]

export default function Benefits(){
  return (
    <section id="beneficios" className={styles.section} aria-labelledby="beneficios-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Pequenos alívios, grandes efeitos</span>
        <h2 id="beneficios-title">O que você pode deixar para trás</h2>
      </div>
      <div className={styles.grid}>
        {ITEMS.map((item, index)=> (
          <article key={item.title} className={styles.card}>
            <div className={styles.icon} aria-hidden="true">0{index + 1}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}><strong>0</strong><span>spoilers lembrados</span></div>
        <div className={styles.stat}><strong>38 g</strong><span>de pura paz</span></div>
        <div className={styles.stat}><strong>30 dias</strong><span>de bateria</span></div>
      </div>
    </section>
  )
}
