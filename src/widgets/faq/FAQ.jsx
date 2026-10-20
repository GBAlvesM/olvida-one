import React from 'react'
import styles from './FAQ.module.css'

const Q = [
  {q:'Preciso criar conta?', a:'Não para o protótipo — este é um mock acadêmico. Nada é coletado ou vendido.'},
  {q:'O aparelho afeta outras pessoas?', a:'Não — por design o Olvida One só afeta quem autoriza o uso. Consentimento é regra.'},
  {q:'Isto é um produto real?', a:'Não — é uma peça fictícia criada para fins acadêmicos. Não há venda nem coleta de dados.'}
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
