import React, { useEffect, useRef, useState } from 'react'
import styles from './MemoryDemo.module.css'
import { scrollToSection } from '../../shared/lib'
import { modes } from '../../entities/memory-mode'
import { ProductDevice } from '../../entities/product'

export default function MemoryDemo(){
  const [mode, setMode] = useState(modes[0].id)
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('idle') // idle | flashing | erased
  const [message, setMessage] = useState('')
  const timeouts = useRef([])
  const modeButtons = useRef([])

  useEffect(()=>{
    return ()=>{
      timeouts.current.forEach(t=>clearTimeout(t))
      timeouts.current = []
    }
  },[])

  function useExample(){
    const m = modes.find(m=>m.id===mode)
    setText(m.placeholder)
  }

  function handleModeSelect(id){
    if (status === 'idle') setMode(id)
  }

  function handleModeKeyDown(event, index) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % modes.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + modes.length) % modes.length
    else return

    event.preventDefault()
    const nextMode = modes[nextIndex]
    setMode(nextMode.id)
    modeButtons.current[nextIndex]?.focus()
  }

  function handleForget(){
    if(!text.trim() || status !== 'idle') return
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finishErasing = () => {
      setStatus('erased')
      setMessage('Memória apagada. Do que estávamos falando mesmo?')
      setCount(currentCount=>currentCount+1)
      // Keep the text briefly so its dissolve transition can finish before clearing.
      const clearTextTimeout = window.setTimeout(()=>setText(''), 550)
      timeouts.current.push(clearTextTimeout)
      const returnToIdleTimeout = window.setTimeout(()=>{
        setMessage('')
        setStatus('idle')
      }, 2500)
      timeouts.current.push(returnToIdleTimeout)
    }

    if(prefersReduced){
      finishErasing()
      return
    }

    setStatus('flashing')
    const flashTimeout = window.setTimeout(finishErasing, 600)
    timeouts.current.push(flashTimeout)
  }

  const activeModeObj = modes.find(m=>m.id===mode)

  return (
    <section id="demo" className={styles.section} aria-labelledby="demo-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Sua vez de testar</span>
        <h2 id="demo-title">Teste o esquecimento</h2>
        <p>Escolha um modo, escreva a lembrança e deixe o resto com a imaginação.</p>
      </div>
      <div className={styles.demoCard}>
        <div className={styles.devicePanel}>
          <div className={styles.deviceAura} />
          <ProductDevice activeMode={mode} glow={status==='flashing'} />
          <span className={styles.deviceCaption}>Olvida One · {activeModeObj.name}</span>
        </div>
        <div className={styles.controls}>
          <span className={styles.fieldLabel}>1. Escolha o modo</span>
          <div className={styles.selector} role="radiogroup" aria-label="Escolha o modo de esquecimento">
            {modes.map((m, index)=> (
              <button
                key={m.id}
                ref={element => { modeButtons.current[index] = element }}
                type="button"
                role="radio"
                aria-checked={m.id===mode}
                tabIndex={m.id===mode ? 0 : -1}
                data-mode={m.id}
                disabled={status !== 'idle'}
                className={`${styles.modeBtn} ${m.id===mode?styles.active:''}`}
                onClick={()=>handleModeSelect(m.id)}
                onKeyDown={event => handleModeKeyDown(event, index)}
              >
                <span className={styles.modeIcon} aria-hidden="true">{m.id === 'cringe' ? 'C' : m.id === 'spoiler' ? 'S' : 'J'}</span>
                <span className={styles.modeName}>{m.name}</span>
                <span className={styles.modeExample}>{m.id === 'cringe' ? 'Micos' : m.id === 'spoiler' ? 'Spoilers' : 'Jingles'}</span>
              </button>
            ))}
          </div>

          <label className={styles.fieldLabel} htmlFor="memory-text">2. O que quer esquecer?</label>
          <div className={`${styles.textField} ${status === 'erased' ? styles.dissolving : ''}`}>
            <textarea
              id="memory-text"
              maxLength={80}
              placeholder={activeModeObj.placeholder}
              value={text}
              onChange={(e)=>setText(e.target.value)}
              disabled={status !== 'idle'}
              aria-describedby="memory-counter"
            />
            <div className={styles.fieldFooter}>
              <button type="button" className={styles.exampleBtn} onClick={useExample} disabled={status !== 'idle'}>Usar exemplo</button>
              <span id="memory-counter" className={styles.counter}>{text.length}<span>/80</span></span>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleForget} disabled={!text.trim() || status!=='idle'} className={styles.eraseBtn}>
              <span className={styles.buttonSpark} aria-hidden="true">✦</span>
              {status === 'flashing' ? 'Um instante…' : status === 'erased' ? 'Apagado' : 'Esquecer agora'}
            </button>
            <button onClick={()=>scrollToSection('produto')} className={styles.linkBtn}>Conheça o aparelho</button>
          </div>

          <div className={styles.statusRow}>
            <span className={styles.session} aria-live="polite">Memórias apagadas nesta sessão: <strong>{count}</strong></span>
            <span className={styles.privacy}><span /> Só você. Só com sua escolha.</span>
          </div>
          <div className={styles.message} aria-live="polite">{message}</div>
        </div>
      </div>
    </section>
  )
}
