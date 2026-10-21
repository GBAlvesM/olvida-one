import React, { useId } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items, openIndex, onToggle }){
  const accordionId = useId().replace(/:/g, '')

  return (
    <div className={styles.accordion}>
      {items.map((it, i)=> (
        <div key={it.q} className={`${styles.item} ${openIndex===i ? styles.itemOpen : ''}`}>
          <button
            id={`${accordionId}-trigger-${i}`}
            aria-expanded={openIndex===i}
            aria-controls={`${accordionId}-panel-${i}`}
            onClick={()=>onToggle(i)}
            className={styles.trigger}
          >
            <span>{it.q}</span>
            <span className={styles.plus} aria-hidden="true" />
          </button>
          <div
            id={`${accordionId}-panel-${i}`}
            className={`${styles.panel} ${openIndex===i?styles.open:''}`}
            role="region"
            aria-labelledby={`${accordionId}-trigger-${i}`}
            aria-hidden={openIndex!==i}
          >
            <div className={styles.panelInner}>
              <p>{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
