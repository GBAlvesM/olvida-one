import React from 'react'
import styles from './FAQ.module.css'
import { Accordion, useAccordion } from '../../features/faq-accordion'

const Q = [
  {q:'O Olvida One funciona de verdade?', a:'No universo da página, sim. No mundo real, é um produto fictício de um projeto acadêmico: nada é vendido.'},
  {q:'Ele apaga memórias importantes?', a:'Não. Só atua nos três modos (Cringe, Spoiler e Jingle). Pessoas, aprendizados e fatos importantes estão fora do alcance.'},
  {q:'Posso usar em outras pessoas?', a:'Não. O flash só funciona em quem aciona o aparelho. Consentimento faz parte do design.'},
  {q:'É seguro para quem é sensível à luz?', a:'O aparelho emite um único pulso suave, sem estrobo. Mesmo assim, há um modo sem flash (apenas vibração) para quem preferir.'},
  {q:'Quanto dura a bateria?', a:'Até 30 dias com uso normal. A carga é por USB-C.'},
  {q:'E se eu me arrepender de esquecer?', a:'Você não vai sentir falta do que esqueceu. Se mesmo assim lembrar, vale a garantia de esquecimento de 30 dias.'},
  {q:'O que acontece com meus dados na lista de espera?', a:'Nada: o formulário é uma simulação. Nenhuma informação é enviada, salva ou coletada.'}
]

export default function FAQ(){
  const { openIndex, toggle } = useAccordion(0)
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Sem dúvida no ar</span>
        <h2 id="faq-title">Perguntas frequentes</h2>
      </div>
      <Accordion items={Q} openIndex={openIndex} onToggle={toggle} />
    </section>
  )
}
