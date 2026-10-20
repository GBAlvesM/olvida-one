import React from 'react'
import styles from './FAQ.module.css'

const Q = [
  {q:'Preciso criar conta?', a:'Não para o protótipo — este é um mock.'},
  {q:'Funciona offline?', a:'Sim, o design prevê armazenamento local em futuras versões.'}
]

export default function FAQ(){
  return (
    <section id="faq" className={styles.section}>
      <h2>FAQ</h2>
      <dl>
        {Q.map(item=> (
          <div key={item.q} className={styles.item}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
