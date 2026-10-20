import { useEffect } from 'react'

export function useEscapeKey(handler){
  useEffect(()=>{
    function onKey(e){ if(e.key === 'Escape') handler(e) }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[handler])
}
