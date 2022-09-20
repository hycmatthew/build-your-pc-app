import { compact, toNumber } from 'lodash'
import { SelectedItemType } from '../module/store/rawDataReducer'

const calculateTotalNumber = (numberList: string[]) => {
  let totalNumber = 0
  numberList.forEach((item) => {
    totalNumber += toNumber(item)
  })
  return totalNumber
}

const addCurrencySign = (str: string, lang: string) => {
  switch (lang) {
    case 'zh-TW':
      return `$${str}`
    case 'zh-CN':
      return `¥${str}`
    default:
      return `$${str}`
  }
}

export const stringToNumber = (str: string | undefined) => {
  return toNumber(str)
}

export const stringToNumberWithDP = (str: string) => {
  return toNumber(str).toFixed(2)
}

export const getCurrentPrice = (
  priceUS: string,
  priceHK: string,
  priceCN: string,
  lang: string
) => {
  switch (lang) {
    case 'zh-TW':
      return `$${stringToNumberWithDP(priceHK)}`
    case 'zh-CN':
      return `¥${stringToNumberWithDP(priceCN)}`
    default:
      return `$${stringToNumberWithDP(priceUS)}`
  }
}

export const getTotalPrice = (
  numberList: (string | undefined)[],
  lang: string
) => {
  const totolPrice = calculateTotalNumber(compact(numberList))
    .toFixed(2)
    .toString()
  return addCurrencySign(totolPrice, lang)
}

export const getTotalPower = (selectedItems: SelectedItemType) => {
  const numberList = [selectedItems.cpu?.power, selectedItems.gpu?.power]
  return calculateTotalNumber(compact(numberList))
}
