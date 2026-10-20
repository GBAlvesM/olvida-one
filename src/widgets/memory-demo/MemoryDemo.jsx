import React, {useState, useRef, useEffect} from 'react'
import styles from './MemoryDemo.module.css'
import ProductDevice from '../product/ProductDevice'
import { scrollToSection } from '../../shared/lib/scrollToSection'
import { modes } from '../../entities/memory-mode'

export default function MemoryDemo(){
  const [mode, setMode] = useState(modes[0].id)
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('idle') // idle | flashing | erased
  const [message, setMessage] = useState('')
  const timeouts = useRef([])
  const textareaRef = useRef(null)

  useEffect(()=>{
    return ()=>{
      // cleanup timeouts
      timeouts.current.forEach(t=>clearTimeout(t))
    }
  },[])

  function useExample(){
    const m = modes.find(m=>m.id===mode)
    setText(m.placeholder)
  }

  function handleModeSelect(id){ setMode(id) }

  async function handleForget(){
    if(!text.trim() || status !== 'idle') return
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // start flashing
    setStatus('flashing')
    if(!prefersReduced){
      // trigger device flash via glow prop (handled by ProductDevice through external prop pulse)
      // keep flashing for ~600ms
      await new Promise(res=>{
        const t = setTimeout(res, 600)
        timeouts.current.push(t)
      })
    }
    // mark erased
    setStatus('erased')
    setMessage('Memória apagada. Do que estávamos falando mesmo?')
    // increment counter and clear textarea after a short delay for dissolve animation
    const t1 = setTimeout(()=>{
      setCount(c=>c+1)
      setText('')
    }, 200)
    timeouts.current.push(t1)

    const t2 = setTimeout(()=>{
      setMessage('')
      setStatus('idle')
    }, 2500)
    timeouts.current.push(t2)
  }

  const activeModeObj = modes.find(m=>m.id===mode)

  return (
    <section id="demo" className={styles.section} aria-labelledby="demo-title">
      <h2 id="demo-title">Demonstração</h2>
      <div className={styles.row}>
        <div className={styles.device}><ProductDevice color="var(--device-color)" activeMode={mode} glow={status==='flashing'} /></div>
        <div className={styles.controls}>
          <div className={styles.selector} role="radiogroup" aria-label="Modos">
            {modes.map(m=> (
              <button key={m.id} role="radio" aria-checked={m.id===mode} className={`${styles.modeBtn} ${m.id===mode?styles.active:''}`} onClick={()=>handleModeSelect(m.id)}>{m.name}</button>
            ))}
          </div>

          <textarea
            ref={textareaRef}
            maxLength={80}
            placeholder={activeModeObj.placeholder}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            aria-label="Texto a apagar"
          />
          <div className={styles.rowMeta}>
            <button className={styles.exampleBtn} onClick={useExample}>Usar exemplo</button>
            <div className={styles.counter}>{text.length}/80</div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleForget} disabled={!text.trim() || status!=='idle'} className={styles.eraseBtn}>Esquecer agora</button>
            <button onClick={()=>scrollToSection('produto')} className={styles.linkBtn}>Ver produto</button>
          </div>

          <div className={styles.session} aria-live="polite">Memórias apagadas nesta sessão: {count}</div>
          <div className={styles.message} aria-live="polite">{message}</div>
        </div>
      </div>
    </section>
  )
}
