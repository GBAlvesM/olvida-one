import React, {useState} from 'react'
import styles from './SiteHeader.module.css'
import { scrollToSection } from '../../shared/lib/scrollToSection'

export default function SiteHeader(){
  const [open, setOpen] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.brand} onClick={()=>scrollToSection('inicio')}>
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <rect x="2" y="6" width="20" height="12" rx="6" fill="var(--color-accent)" />
        </svg>
        <span>Olvida</span>
      </div>

      <nav className={`${styles.nav} ${open?styles.open:''}`} aria-label="Main navigation">
        <a onClick={(e)=>{e.preventDefault(); scrollToSection('beneficios')}} href="#beneficios">Benefícios</a>
        <a onClick={(e)=>{e.preventDefault(); scrollToSection('como-funciona')}} href="#como-funciona">Como funciona</a>
        <a onClick={(e)=>{e.preventDefault(); scrollToSection('produto')}} href="#produto">Produto</a>
        <a onClick={(e)=>{e.preventDefault(); scrollToSection('preco')}} href="#preco">Preço</a>
        <a onClick={(e)=>{e.preventDefault(); scrollToSection('faq')}} href="#faq">FAQ</a>
        <button className={styles.cta} onClick={()=>scrollToSection('lista')}>Entrar na lista</button>
      </nav>

      <button className={styles.burger} aria-expanded={open} onClick={()=>setOpen(v=>!v)} aria-label="Abrir menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
