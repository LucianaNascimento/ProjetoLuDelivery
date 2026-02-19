import { Product } from "@/types/Product"

export type getTenantResponse = {
  name: string
  slug: string
  mainColor: string
  secondColor: string
}

const TEMPORARYoneProduct: Product = {
  id: 1,
  image: '/tmp/burger.png',
  categoryName: 'Tradicional',
  productName: 'Hamburguer',
  price: 15.99,
  description: 'Hamburguer tradicional com queijo e alface'
}

export const useApi = (tenantSlug: string) => ({

  getTenant: async () => {
    switch (tenantSlug) {
      case 'lucianaburger':
        return {
          name: 'Luciana Burger',
          slug: 'lucianaburger',
          mainColor: '#f89400',
          secondColor: '#f8c7a0'
        }
        break;
      case 'lucianapizza':
        return {
          name: 'Luciana Pizza',
          slug: 'lucianapizza',
          mainColor: '#0d6efd',
          secondColor: '#a0c4ff'
        }
        break;
      default:
        return false
    }
  },

  getAllProducts: async () => {
    let products = []
    for (let i = 0; i < 10; i++) {
      products.push(TEMPORARYoneProduct)
    }

    return products
  },

  getProduct: async (id: string) => {
    return TEMPORARYoneProduct
  }

})