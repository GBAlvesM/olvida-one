import React, {useState} from 'react'
import styles from './SiteHeader.module.css'
import { scrollToSection } from '../../shared/lib'

export default function SiteHeader(){
  const [open, setOpen] = useState(false)

  function goToSection(id) {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#inicio" onClick={(event)=>{event.preventDefault();goToSection('inicio')}} aria-label="Olvida, início">
        <svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="5" y="3" width="22" height="26" rx="11" fill="var(--color-surface-2)" stroke="var(--color-primary)" strokeWidth="1.5" />
          <circle cx="16" cy="11" r="4" fill="var(--color-primary)" />
          <path d="M16 18v5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Olvida<span className={styles.brandPeriod}>.</span></span>
      </a>

      <nav id="primary-navigation" className={`${styles.nav} ${open?styles.open:''}`} aria-label="Navegação principal">
        <a onClick={(event)=>{event.preventDefault();goToSection('beneficios')}} href="#beneficios">Benefícios</a>
        <a onClick={(event)=>{event.preventDefault();goToSection('como-funciona')}} href="#como-funciona">Como funciona</a>
        <a onClick={(event)=>{event.preventDefault();goToSection('produto')}} href="#produto">Produto</a>
        <a onClick={(event)=>{event.preventDefault();goToSection('preco')}} href="#preco">Preço</a>
        <a onClick={(event)=>{event.preventDefault();goToSection('faq')}} href="#faq">FAQ</a>
        <button className={styles.cta} onClick={()=>goToSection('lista')}>Entrar na lista</button>
      </nav>

      <button className={styles.burger} aria-controls="primary-navigation" aria-expanded={open} onClick={()=>setOpen(v=>!v)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
