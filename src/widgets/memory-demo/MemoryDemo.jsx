import React, {useState} from 'react'
import styles from './MemoryDemo.module.css'
import ProductDevice from '../product/ProductDevice'
import { useMemoryEraser } from '../../features/memory-eraser/model/useMemoryEraser'
import { scrollToSection } from '../../shared/lib/scrollToSection'

const SAMPLE = "Mandei áudio de 4 minutos no grupo errado"

export default function MemoryDemo(){
  const { erase } = useMemoryEraser()
  const [mode, setMode] = useState('cringe')
  const [erasing, setErasing] = useState(false)
  const [erased, setErased] = useState(false)
  const [pulse, setPulse] = useState(false)

  async function handleErase(){
    setErasing(true)
    setPulse(true)
    try{
      await erase(mode, SAMPLE)
      // show dissolved text
      setErased(true)
    }finally{
      setErasing(false)
      setTimeout(()=>setPulse(false),800)
    }
  }

  return (
    <section id="demo" className={styles.section} aria-labelledby="demo-title">
      <h2 id="demo-title">Demonstração</h2>
      <div className={styles.row}>
        <div className={styles.device}><ProductDevice color="var(--device-color)" activeMode={mode} glow={pulse} /></div>
        <div className={styles.controls}>
          <div className={styles.modes}>
            <label>Modo:</label>
            <select value={mode} onChange={(e)=>setMode(e.target.value)}>
              <option value="cringe">Modo Cringe</option>
              <option value="spoiler">Modo Spoiler</option>
              <option value="jingle">Modo Jingle</option>
            </select>
          </div>

          <div className={styles.sample} aria-live="polite">
            <p className={erased?styles.dissolve:''}>{SAMPLE}</p>
          </div>

          <div className={styles.actions}>
            <button onClick={handleErase} disabled={erasing} className={styles.eraseBtn}>Simular apagar</button>
            <button onClick={()=>scrollToSection('produto')} className={styles.linkBtn}>Ver produto</button>
          </div>
        </div>
      </div>
    </section>
  )
}
