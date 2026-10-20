import React from 'react'
import styles from './Waitlist.module.css'
import WaitlistForm from '../../features/waitlist-signup/ui/WaitlistForm'

export default function Waitlist(){
  return (
    <section id="lista" className={styles.section} aria-labelledby="waitlist-title">
      <h2 id="waitlist-title">Entrar na lista</h2>
      <p>Cadastre-se para receber notícias e acessar o protótipo.</p>
      <WaitlistForm />
    </section>
  )
}
