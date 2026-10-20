import React from 'react'
import styles from './Modes.module.css'

const MODES = [
  {id:'cringe', title:'Modo Cringe', desc:'Apaga micos e constrangimentos. Ex.: "Mandei áudio de 4 minutos no grupo errado"'},
  {id:'spoiler', title:'Modo Spoiler', desc:'Apaga spoilers acidentais. Ex.: "Descobri o final da série no elevador"'},
  {id:'jingle', title:'Modo Jingle', desc:'Apaga músicas grudentas. Ex.: "Aquele jingle do comercial de colchão"'}
]

export default function Modes(){
  return (
    <section id="modes" className={styles.section}>
      <h2>Os 3 modos do Olvida One</h2>
      <div className={styles.row}>
        <div className={styles.device} aria-hidden>
          {/* simple SVG representation of the device */}
          <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="136" height="176" rx="18" fill="#f8fbfb" stroke="#e6eef2" />
            <circle cx="70" cy="50" r="24" fill="#2a9d8f" />
            <rect x="28" y="90" width="84" height="60" rx="8" fill="#fff" />
            <rect x="40" y="108" width="60" height="6" rx="3" fill="#e6eef2" />
          </svg>
        </div>

        <div className={styles.list}>
          {MODES.map(m => (
            <div key={m.id} className={styles.card}>
              <div className={styles.badge}>{m.id.toUpperCase()}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
