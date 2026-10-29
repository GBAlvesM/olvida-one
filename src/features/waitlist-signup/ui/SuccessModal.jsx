import React from 'react'
import styles from './SuccessModal.module.css'
import { Modal } from '../../../shared/ui'

export default function SuccessModal({onClose, message, returnFocusRef}){
  return (
    <Modal onClose={onClose} labelledBy="success-title" returnFocusRef={returnFocusRef}>
      <div className={styles.boxInner}>
        <div className={styles.successMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m6 12.5 4 4L18.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className={styles.kicker}>Pronto para esquecer</span>
        <h3 id="success-title">Você está na lista!</h3>
        <p>{message || 'Você entrou na lista de espera (simulado). Aviso: protótipo não envia dados.'}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </Modal>
  )
}
