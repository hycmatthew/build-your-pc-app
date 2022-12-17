import { t } from 'i18next'
import i18n from '../config/i18n'
import { RAMType, SSDType } from '../constant/objectTypes'
import { addCurrencySign } from './NumberHelper'

export const brandTranslationKey = (brand: string) => {
  const brandKey = brand.toLowerCase().replace('.', '').replace(' ', '-')
  return i18n.exists(brandKey) ? brandKey : brand
}

export const generateItemName = (brand: string, name: string) => {
  const brandKey = brandTranslationKey(brand)
  return `${t(brandKey)} ${name}`
}

export const generateSSDName = (item: SSDType) => {
  return `${t(brandTranslationKey(item.brand))} ${item.series} ${item.capacity} ${item.sizeType}`
}

export const generateRAMName = (item: RAMType) => {
  return `${t(brandTranslationKey(item.brand))} ${item.series} ${item.type} ${item.speed} C${item.cl} ${item.capacity}`
}

export const priceLabelHandler = (price: string) => {
  return Number(price) === 0 ? '-' : addCurrencySign(price)
}

export const lengthLabelHandler = (length: number) => {
  return `${length}mm`
}
