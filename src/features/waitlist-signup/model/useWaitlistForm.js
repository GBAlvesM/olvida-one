export function useWaitlistForm(){
  function validate({name,email}){
    if(!name || name.trim().length<2) return {ok:false, error:'Informe seu nome'}
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return {ok:false, error:'Informe um email válido'}
    return {ok:true}
  }

  function submit(){
    return new Promise((resolve)=>{
      setTimeout(()=> resolve({success:true}), 700)
    })
  }

  return { validate, submit }
}
