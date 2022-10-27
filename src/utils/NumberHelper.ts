import { compact, sum, toNumber } from 'lodash'
import i18n from '../config/i18n'
import { SelectedItemType } from '../module/store/rawDataReducer'

export const getSelectedCurrency = () => {
  switch (i18n.language) {
    case 'zh-TW':
      return 'priceHK'
    case 'zh-CN':
      return 'priceCN'
    default:
      return 'priceUS'
  }
}

export const calculateTotalNumber = (numberList: string[]) => {
  let totalNumber = 0
  numberList.forEach((item) => {
    totalNumber += toNumber(item)
  })
  return totalNumber
}

export const addCurrencySign = (str: string) => {
  switch (i18n.language) {
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
      return stringToNumberWithDP(priceHK)
    case 'zh-CN':
      return stringToNumberWithDP(priceCN)
    default:
      return stringToNumberWithDP(priceUS)
  }
}

export const getCurrentPriceWithSign = (
  priceUS: string,
  priceHK: string,
  priceCN: string,
  lang: string
) => {
  return addCurrencySign(getCurrentPrice(priceUS, priceHK, priceCN, lang))
}

export const getTotalPrice = (
  selectedItems: SelectedItemType,
) => {
  const numberList = [
    selectedItems.cpu?.[getSelectedCurrency()],
    selectedItems.gpu?.[getSelectedCurrency()],
    selectedItems.motherboard?.[getSelectedCurrency()],
    selectedItems.ram?.[getSelectedCurrency()],
    selectedItems.psu?.[getSelectedCurrency()],
    selectedItems.ssd?.[getSelectedCurrency()],
    selectedItems.aio?.[getSelectedCurrency()],
    selectedItems.airCooler?.[getSelectedCurrency()],
    selectedItems.pcCase?.[getSelectedCurrency()],
  ]

  const totolPrice = calculateTotalNumber(compact(numberList))
    .toFixed(2)
    .toString()
  return addCurrencySign(totolPrice)
}

export const getTotalPower = (selectedItems: SelectedItemType) => {
  const numberList = [selectedItems.cpu?.power, selectedItems.gpu?.power]
  return sum(numberList) || 0
}
