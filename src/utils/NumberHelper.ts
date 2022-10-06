import { compact, sum, toNumber } from 'lodash'
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
  selectedItems: SelectedItemType,
  lang: string
) => {
  const numberList = () => {
    switch (lang) {
      case 'zh-CN':
        return [
          selectedItems.cpu?.priceCN,
          selectedItems.gpu?.priceCN,
          selectedItems.motherboard?.priceCN,
          selectedItems.ram?.priceCN,
          selectedItems.psu?.priceCN,
          selectedItems.pcCase?.priceCN,
        ]
      case 'zh-TW':
        return [
          selectedItems.cpu?.priceHK,
          selectedItems.gpu?.priceHK,
          selectedItems.motherboard?.priceHK,
          selectedItems.ram?.priceHK,
          selectedItems.psu?.priceHK,
          selectedItems.pcCase?.priceHK,
        ]
      default:
        return [
          selectedItems.cpu?.priceUS,
          selectedItems.gpu?.priceUS,
          selectedItems.motherboard?.priceUS,
          selectedItems.ram?.priceUS,
          selectedItems.psu?.priceUS,
          selectedItems.pcCase?.priceUS,
        ]
    }
  }

  const totolPrice = calculateTotalNumber(compact(numberList()))
    .toFixed(2)
    .toString()
  return addCurrencySign(totolPrice, lang)
}

export const getTotalPower = (selectedItems: SelectedItemType) => {
  const numberList = [selectedItems.cpu?.power, selectedItems.gpu?.power]
  console.log(sum(numberList))
  return sum(numberList) || 0
}
