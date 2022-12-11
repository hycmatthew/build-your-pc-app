import { toNumber } from 'lodash'
import i18n from '../../../config/i18n'
import buildConfig from '../data/buildConfig'

export const convertCurrency = (price: number) => {
  switch (i18n.language) {
    case 'zh-TW':
      return price * buildConfig.hkPricingFactor
    case 'zh-CN':
      return price * buildConfig.cnPricingFactor
    default:
      return price * buildConfig.usPricingFactor
  }
}

export const getPricingFactor = (budget: number, factorList: number[]) => {
  const tempList = buildConfig.priceList
  const updatedBudget = convertCurrency(budget)
  let factor: number = factorList[0]

  factorList.forEach((element, index) => {
    if (updatedBudget < tempList[index]) {
      factor = element
    }
  })
  return factor
}

export const getBudgetPriceList = () => {
  const tempList = buildConfig.priceList
  switch (i18n.language) {
    case 'zh-TW':
      return tempList
    case 'zh-CN':
      return tempList.map((item) => {
        return item / convertCurrency(1)
      })
    default:
      return tempList.map((item) => {
        return item / convertCurrency(1)
      })
  }
}

export const getBudgetByPricingFactor = (budget: number, factorList: number[]) => {
  return budget * getPricingFactor(budget, factorList)
}

export const isEnoughBudget = (budget: number, itemPrice: string) => {
  const priceNum = toNumber(itemPrice)
  if (priceNum !== 0 && budget > priceNum) return true
  return false
}
