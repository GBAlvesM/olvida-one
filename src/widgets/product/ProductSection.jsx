import React, {useState} from 'react'
import ProductDevice from './ProductDevice'
import { product as productMock, SpecList } from '../../entities/product'
import styles from './ProductSection.module.css'

const COLORS = [
  {id:'graphite', name:'Grafite Noturno', value:'#1B2238'},
  {id:'mist', name:'Branco Névoa', value:'#E8EEF9'},
  {id:'violet', name:'Violeta Esquecido', value:'#6B4FD8'}
]

export default function ProductSection(){
  const [color, setColor] = useState(COLORS[0].value)
  const [active, setActive] = useState('cringe')
  const [pulse, setPulse] = useState(false)

  function triggerPulse(){
    // single pulse: toggle pulse true briefly
    setPulse(true)
    setTimeout(()=>setPulse(false), 750)
  }

  return (
    <section id="produto" className={styles.section} aria-labelledby="product-title">
      <h2>Produto</h2>
      <div className={styles.row}>
        <div className={styles.deviceWrap}>
          <ProductDevice color={color} activeMode={active} glow={pulse} />
          <div className={styles.controls}>
            <div className={styles.colorPick} role="radiogroup" aria-label="Escolha a cor">
              <span>Cor:</span>
              {COLORS.map(c=> (
                <button key={c.id} role="radio" aria-checked={c.value===color} className={`${styles.swatch} ${c.value===color?styles.active:''}`} onClick={()=>setColor(c.value)} aria-label={c.name}>
                  <span style={{background:c.value}} />
                </button>
              ))}
            </div>

            <div className={styles.modePick}>
              <span>Modo:</span>
              <select value={active} onChange={(e)=>setActive(e.target.value)}>
                <option value="cringe">Modo Cringe</option>
                <option value="spoiler">Modo Spoiler</option>
                <option value="jingle">Modo Jingle</option>
              </select>
            </div>

            <div className={styles.actions}>
              <button className={styles.flashBtn} onClick={triggerPulse}>Simular flash</button>
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <h3>{productMock.name}</h3>
          <p>{productMock.tagline}</p>
          <SpecList specs={productMock.specs} />
          <p className={styles.note}>As cores disponíveis: Grafite Noturno, Branco Névoa e Violeta Esquecido.</p>
        </div>
      </div>
    </section>
  )
}
