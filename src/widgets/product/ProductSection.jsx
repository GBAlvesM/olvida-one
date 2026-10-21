import React, { useRef, useState } from 'react'
import { ProductDevice, product as productMock, SpecList } from '../../entities/product'
import styles from './ProductSection.module.css'

const COLORS = [
  {id:'graphite', name:'Grafite Noturno', value:'#1B2238'},
  {id:'mist', name:'Branco Névoa', value:'#E8EEF9'},
  {id:'violet', name:'Violeta Esquecido', value:'#6B4FD8'}
]

export default function ProductSection(){
  const [color, setColor] = useState(COLORS[0].value)
  const swatchRefs = useRef([])

  function handleColorKeyDown(event, index) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % COLORS.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + COLORS.length) % COLORS.length
    else return

    event.preventDefault()
    const nextColor = COLORS[nextIndex]
    setColor(nextColor.value)
    swatchRefs.current[nextIndex]?.focus()
  }

  return (
    <section id="produto" className={styles.section} aria-labelledby="product-title">
      <div className={styles.heading}>
        <span className={styles.kicker}>Feito para caber na sua rotina</span>
        <h2 id="product-title">Pequeno aparelho. Grande alívio.</h2>
      </div>
      <div className={styles.panel}>
        <div className={styles.deviceColumn}>
          <div className={styles.deviceStage}>
            <div className={styles.deviceAura} />
            <ProductDevice className={styles.showcaseDevice} color={color} activeMode="cringe" />
          </div>
          <div className={styles.colorPicker} role="radiogroup" aria-label="Escolha a cor do aparelho">
            {COLORS.map((item, index) => (
              <button
                key={item.id}
                ref={element => { swatchRefs.current[index] = element }}
                type="button"
                role="radio"
                aria-checked={item.value === color}
                tabIndex={item.value === color ? 0 : -1}
                aria-label={item.name}
                className={`${styles.swatch} ${item.value === color ? styles.selected : ''}`}
                style={{ '--swatch-color': item.value }}
                onKeyDown={event => handleColorKeyDown(event, index)}
                onClick={() => setColor(item.value)}
              >
                <span className={styles.swatchDot} />
              </button>
            ))}
            <span className={styles.colorName}>{COLORS.find((item) => item.value === color).name}</span>
          </div>
        </div>

        <div className={styles.copy}>
          <div className={styles.productLabel}><span className={styles.labelDot} /> {productMock.brand} / {productMock.name}</div>
          <p className={styles.tagline}>{productMock.tagline}</p>
          <p className={styles.description}>Micos, spoilers e músicas grudadas: escolha o que deixar para trás. O Olvida One só age quando você escolhe — e só em você.</p>
          <SpecList specs={productMock.specs} />
          <div className={styles.fictionNote}>Protótipo acadêmico · produto fictício</div>
        </div>
      </div>
    </section>
  )
}
