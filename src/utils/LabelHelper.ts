import { t } from 'i18next'

export const generateItemName = (brand: string, name: string) => {
  return `${t(brand)} ${name}`
}
