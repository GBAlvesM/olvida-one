import React from 'react'
import styles from './SuccessModal.module.css'

export default function SuccessModal({onClose}){
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.box}>
        <h3>Obrigado!</h3>
        <p>Você entrou na lista de espera (simulado). Aviso: protótipo não envia dados.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}
