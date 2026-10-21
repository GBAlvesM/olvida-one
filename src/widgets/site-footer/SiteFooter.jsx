import React from 'react'
import styles from './SiteFooter.module.css'
import { scrollToSection } from '../../shared/lib'

export default function SiteFooter(){
  return (
    <footer className={styles.footer}>
      <a className={styles.brand} href="#inicio" onClick={(event)=>{event.preventDefault();scrollToSection('inicio')}}>Olvida One<span>.</span></a>
      <div className={styles.links}>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('beneficios')}} href="#beneficios">Benefícios</a>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('como-funciona')}} href="#como-funciona">Como funciona</a>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('produto')}} href="#produto">Produto</a>
      </div>
      <div className={styles.note}>Olvida One é um produto fictício criado para um projeto acadêmico. Nada é vendido e nenhum dado é coletado.</div>
    </footer>
  )
}
