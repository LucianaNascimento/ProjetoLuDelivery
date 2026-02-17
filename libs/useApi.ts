export type getTenantResponse = {
  name: string
  slug: string
  mainColor: string
  secondColor: string
}

export const useApi = () => ({

  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
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
  }
})