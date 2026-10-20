import React, {useState} from 'react'
import styles from './WaitlistForm.module.css'
// useWaitlistForm is not used because validation is implemented locally in the form
import SuccessModal from './SuccessModal'
import { modes } from '../../../entities/memory-mode'
import { plans } from '../../../entities/plan'

export default function WaitlistForm({ selectedPlanId = null, onPlanChange = ()=>{} }){
  const [values, setValues] = useState({name:'', email:'', plan: selectedPlanId || plans[0].id, want: modes[0].id, consent:false})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  

  function onBlurValidate(){
    // produce field-specific messages
    const e = {}
    if(!values.name || values.name.trim().length<2) e.name = 'Informe seu nome (mínimo 2 caracteres)'
    if(!values.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = 'Informe um email válido'
    if(!values.consent) e.consent = 'Você precisa confirmar que entendeu que é fictício'
    setErrors(e)
    return Object.keys(e).length===0
  }

  async function handleSubmit(e){
    e.preventDefault()
    const ok = onBlurValidate()
    if(!ok) return
    setLoading(true)
    // simulate request
    await new Promise(res=>setTimeout(res,800))
    setLoading(false)
    const pos = Math.floor(1000 + Math.random()*8999)
    setSuccessMsg(`Você está na lista, ${values.name}! Sua posição fictícia: #${pos}.`)
    // clear form
    setValues({name:'', email:'', plan: selectedPlanId || plans[0].id, want: modes[0].id, consent:false})
    setErrors({})
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulário de lista">
        <div>
          <input placeholder="Nome" value={values.name} onChange={e=>setValues({...values,name:e.target.value})} onBlur={()=>onBlurValidate()} aria-invalid={errors.name?true:false} aria-describedby={errors.name? 'err-name':''} />
          {errors.name && <div id="err-name" className={styles.error}>{errors.name}</div>}
        </div>

        <div>
          <input placeholder="Email" value={values.email} onChange={e=>setValues({...values,email:e.target.value})} onBlur={()=>onBlurValidate()} aria-invalid={errors.email?true:false} aria-describedby={errors.email? 'err-email':''} />
          {errors.email && <div id="err-email" className={styles.error}>{errors.email}</div>}
        </div>

        <div>
          <label>Plano de interesse</label>
          <select value={values.plan} onChange={e=>{ setValues({...values,plan:e.target.value}); onPlanChange(e.target.value) }}>
            {plans.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div>
          <label>O que você mais quer esquecer?</label>
          <select value={values.want} onChange={e=>setValues({...values,want:e.target.value})}>
            {modes.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <div>
          <label className={styles.checkbox}><input type="checkbox" checked={values.consent} onChange={e=>setValues({...values,consent:e.target.checked})} /> Entendi que o Olvida One é um produto fictício.</label>
          {errors.consent && <div className={styles.error}>{errors.consent}</div>}
        </div>

        <div>
          <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Entrar na lista'}</button>
        </div>
      </form>
      {successMsg && <SuccessModal onClose={()=>setSuccessMsg(null)} message={successMsg} />}
    </div>
  )
}
