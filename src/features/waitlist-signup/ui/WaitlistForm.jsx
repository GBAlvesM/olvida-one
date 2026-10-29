import React, { useEffect, useId, useRef, useState } from 'react'
import styles from './WaitlistForm.module.css'
import SuccessModal from './SuccessModal'
import { modes } from '../../../entities/memory-mode'
import { plans } from '../../../entities/plan'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function WaitlistForm({ selectedPlanId = null, onPlanChange = () => {} }) {
  const id = useId()
  const [values, setValues] = useState({
    name: '',
    email: '',
    plan: selectedPlanId || plans[0].id,
    want: modes[0].id,
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const submitTimer = useRef(null)
  const submitButton = useRef(null)

  useEffect(() => {
    if (selectedPlanId) {
      setValues(current => ({ ...current, plan: selectedPlanId }))
    }
  }, [selectedPlanId])

  useEffect(() => () => window.clearTimeout(submitTimer.current), [])

  function validateField(field, value) {
    if (field === 'name' && String(value).trim().length < 2) {
      return 'Informe seu nome com pelo menos 2 caracteres.'
    }
    if (field === 'email' && !EMAIL_PATTERN.test(String(value).trim())) {
      return 'Informe um e-mail válido.'
    }
    if (field === 'consent' && !value) {
      return 'Confirme que entendeu que o produto é fictício.'
    }
    return ''
  }

  function updateField(field, value) {
    setValues(current => ({ ...current, [field]: value }))

    if (touched[field] || errors[field]) {
      const error = validateField(field, value)
      setErrors(current => {
        const next = { ...current }
        if (error) next[field] = error
        else delete next[field]
        return next
      })
    }
  }

  function validateAll() {
    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      consent: validateField('consent', values.consent)
    }
    Object.keys(nextErrors).forEach(field => {
      if (!nextErrors[field]) delete nextErrors[field]
    })
    setErrors(nextErrors)
    setTouched({ name: true, email: true, consent: true })
    return Object.keys(nextErrors).length === 0
  }

  function handleBlur(field) {
    setTouched(current => ({ ...current, [field]: true }))
    const error = validateField(field, values[field])
    setErrors(current => {
      const next = { ...current }
      if (error) next[field] = error
      else delete next[field]
      return next
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (loading || !validateAll()) return

    setLoading(true)
    submitTimer.current = window.setTimeout(() => {
      const position = Math.floor(1000 + Math.random() * 9000)
      setSuccessMessage(`Você está na lista, ${values.name.trim()}! Sua posição fictícia: #${position}.`)
      setValues({ name: '', email: '', plan: selectedPlanId || plans[0].id, want: modes[0].id, consent: false })
      setErrors({})
      setTouched({})
      setLoading(false)
    }, 800)
  }

  const nameErrorId = `${id}-name-error`
  const emailErrorId = `${id}-email-error`
  const consentErrorId = `${id}-consent-error`

  return (
    <div className={styles.formShell}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Formulário da lista de espera">
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Seu nome</label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            value={values.name}
            onChange={event => updateField('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? nameErrorId : undefined}
          />
          {errors.name && <span id={nameErrorId} className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>E-mail</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            value={values.email}
            onChange={event => updateField('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? emailErrorId : undefined}
          />
          {errors.email && <span id={emailErrorId} className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-plan`}>Plano de interesse</label>
          <select
            id={`${id}-plan`}
            name="plan"
            value={values.plan}
            onChange={event => {
              updateField('plan', event.target.value)
              onPlanChange(event.target.value)
            }}
          >
            {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-mode`}>O que você mais quer esquecer?</label>
          <select
            id={`${id}-mode`}
            name="mode"
            value={values.want}
            onChange={event => updateField('want', event.target.value)}
          >
            {modes.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
          </select>
        </div>

        <div className={styles.consentField}>
          <label className={styles.checkboxLabel} htmlFor={`${id}-consent`}>
            <input
              id={`${id}-consent`}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={event => updateField('consent', event.target.checked)}
              onBlur={() => handleBlur('consent')}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? consentErrorId : undefined}
            />
            <span className={styles.checkboxMark} aria-hidden="true" />
            <span>Entendi que o Olvida One é um produto fictício.</span>
          </label>
          {errors.consent && <span id={consentErrorId} className={styles.error}>{errors.consent}</span>}
        </div>

        <button ref={submitButton} className={styles.submit} type="submit" disabled={loading}>
          {loading ? <><span className={styles.spinner} aria-hidden="true" /> Enviando…</> : 'Entrar na lista'}
        </button>
        <p className={styles.privacyNote}>Simulação local. Nenhum dado é enviado, salvo ou coletado.</p>
      </form>

      {successMessage && (
        <SuccessModal onClose={() => setSuccessMessage('')} returnFocusRef={submitButton} message={successMessage} />
      )}
    </div>
  )
}
