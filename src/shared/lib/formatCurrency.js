export function formatCurrencyBRL(value){
  // value in cents
  const num = value / 100
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
}
