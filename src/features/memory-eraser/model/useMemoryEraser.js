// Simple mock hook that simulates an erase operation.
export function useMemoryEraser(){
  // erase returns a promise that resolves after a small delay
  function erase(mode, text){
    return new Promise((resolve)=>{
      // simulate processing time
      setTimeout(()=>resolve({success:true, mode, text}), 700)
    })
  }

  return { erase }
}
