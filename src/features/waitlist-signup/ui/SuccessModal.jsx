import React from 'react'
import styles from './SuccessModal.module.css'
import Modal from '../../../shared/ui/Modal'

export default function SuccessModal({onClose, message}){
  return (
    <Modal onClose={onClose} labelledBy="success-title">
      <div className={styles.boxInner}>
        <h3 id="success-title">Obrigado!</h3>
        <p>{message || 'Você entrou na lista de espera (simulado). Aviso: protótipo não envia dados.'}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </Modal>
  )
}
