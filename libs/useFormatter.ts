export const useFormatter = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-BR', {
       style: 'currency', 
       currency: 'BRL',
      minimumFractionDigits: 2
      })
  }
})