import React from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items, openIndex, onToggle }){
  return (
    <div className={styles.accordion}>
      {items.map((it, i)=> (
        <div key={it.q} className={styles.item}>
          <button aria-expanded={openIndex===i} onClick={()=>onToggle(i)} className={styles.trigger}>
            <span>{it.q}</span>
          </button>
          <div className={`${styles.panel} ${openIndex===i?styles.open:''}`} role="region">
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
