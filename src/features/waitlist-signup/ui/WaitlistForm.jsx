import React, {useState} from 'react'
import styles from './WaitlistForm.module.css'
import { useWaitlistForm } from '../model/useWaitlistForm'
import SuccessModal from './SuccessModal'

export default function WaitlistForm(){
  const { validate, submit } = useWaitlistForm()
  const [values, setValues] = useState({name:'', email:''})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    const v = validate(values)
    if(!v.ok){ setError(v.error); return }
    setError(null)
    setLoading(true)
    await submit(values)
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulário de lista">
        <input placeholder="Nome" value={values.name} onChange={e=>setValues({...values,name:e.target.value})} />
        <input placeholder="Email" value={values.email} onChange={e=>setValues({...values,email:e.target.value})} />
        <button type="submit" disabled={loading}>Entrar na lista</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
      {success && <SuccessModal onClose={()=>setSuccess(false)} />}
    </div>
  )
}
