import React from 'react'
import styles from './HowItWorks.module.css'

const STEPS = [
  {title:'Escolha o modo', desc:'Gire o anel: Cringe, Spoiler ou Jingle.'},
  {title:'Aponte a lente para si', desc:'A lente reconhece o modo e prepara o flash.'},
  {title:'Pisque e siga a vida', desc:'Um pulso suave e pronto. Do que estávamos falando mesmo?'}
]

export default function HowItWorks(){
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Três passos. Menos ruído.</span>
        <h2 id="how-title">Como funciona</h2>
      </div>
      <ol className={styles.list}>
        {STEPS.map((s,i)=> (
          <li key={s.title} className={styles.item}>
            <div className={styles.icon} aria-hidden="true">
              {i === 0 && <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" /><path d="M16 6v5m10 5h-5m-5 10v-5M6 16h5" /></svg>}
              {i === 1 && <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" /><circle cx="16" cy="16" r="4" /><path d="M16 2v4m0 20v4M2 16h4m20 0h4" /></svg>}
              {i === 2 && <svg viewBox="0 0 32 32"><path d="m16 3 2.8 9.2L28 16l-9.2 2.8L16 28l-2.8-9.2L4 16l9.2-3.8L16 3Z" /><path d="M25 3v5m-2.5-2.5h5" /></svg>}
            </div>
            <div>
              <span className={styles.stepNumber}>0{i+1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
