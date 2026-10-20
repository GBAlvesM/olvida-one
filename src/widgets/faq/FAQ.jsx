import React from 'react'
import styles from './FAQ.module.css'
import Accordion from '../../features/faq-accordion/ui/Accordion'
import { useAccordion } from '../../features/faq-accordion/model/useAccordion'

const Q = [
  {q:'Preciso criar conta?', a:'Não para o protótipo — este é um mock acadêmico. Nada é coletado ou vendido.'},
  {q:'O aparelho afeta outras pessoas?', a:'Não — por design o Olvida One só afeta quem autoriza o uso. Consentimento é regra.'},
  {q:'Isto é um produto real?', a:'Não — é uma peça fictícia criada para fins acadêmicos. Não há venda nem coleta de dados.'},
  {q:'Como escolho o modo?', a:'Use o seletor no produto para alternar entre Cringe, Spoiler e Jingle.'},
  {q:'O flash pode incomodar?', a:'O pulso é suave e opcional; respeitamos prefers-reduced-motion.'},
  {q:'Há planos pagos?', a:'Esta é uma página de protótipo — os preços são fictícios.'},
  {q:'Este app coleta dados?', a:'Não — o protótipo não envia nem armazena informações.'}
]

export default function FAQ(){
  const { openIndex, toggle } = useAccordion(0)
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <h2 id="faq-title">FAQ</h2>
      <Accordion items={Q} openIndex={openIndex} onToggle={toggle} />
    </section>
  )
}
