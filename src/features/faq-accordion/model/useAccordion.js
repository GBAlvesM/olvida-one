import { useState, useCallback } from 'react'

export function useAccordion(defaultIndex = null){
  const [openIndex, setOpenIndex] = useState(defaultIndex)
  const toggle = useCallback((i)=>{
    setOpenIndex(prev => prev === i ? null : i)
  },[])
  return { openIndex, toggle }
}
