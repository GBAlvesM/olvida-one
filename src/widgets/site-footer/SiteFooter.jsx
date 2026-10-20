import React from 'react'
import styles from './SiteFooter.module.css'
import { scrollToSection } from '../../shared/lib/scrollToSection'

export default function SiteFooter(){
  return (
    <footer className={styles.footer}>
      <div className={styles.brand} onClick={()=>scrollToSection('inicio')}>Olvida One</div>
      <div className={styles.links}>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('beneficios')}} href="#beneficios">Benefícios</a>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('como-funciona')}} href="#como-funciona">Como funciona</a>
        <a onClick={(e)=>{e.preventDefault();scrollToSection('produto')}} href="#produto">Produto</a>
      </div>
      <div className={styles.note}>Olvida One é um produto fictício criado para um projeto acadêmico. Nada é vendido e nenhum dado é coletado.</div>
    </footer>
  )
}
