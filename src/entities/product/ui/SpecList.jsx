import React from 'react'
import styles from './SpecList.module.css'

export default function SpecList({specs}){
  return (
    <dl className={styles.list}>
      {specs.map(s=> (
        <div key={s.label} className={styles.item}>
          <dt className={styles.term}>{s.label}</dt>
          <dd className={styles.desc}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
