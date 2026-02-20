export const useFormatter = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-BR', {
       style: 'currency', 
       currency: 'BRL',
      minimumFractionDigits: 2
      })
  },
  formatQuantity: (quantity: number, digits: number) => {
    if (quantity.toString().length >= digits) return quantity.toString()      
    const remain = digits - quantity.toString().length
    return `${'0'.repeat(remain)}${quantity}`

}
})