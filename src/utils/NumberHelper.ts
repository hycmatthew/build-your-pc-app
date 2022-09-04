import { compact, toNumber } from 'lodash'

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

export const getCurrentPrice = (
  priceUS: string,
  priceHK: string,
  priceCN: string,
  lang: string
) => {
  switch (lang) {
    case 'zh-TW':
      return `$${toNumber(priceHK).toFixed(2)}`
    case 'zh-CN':
      return `¥${toNumber(priceCN).toFixed(2)}`
    default:
      return `$${toNumber(priceUS).toFixed(2)}`
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

export const getTotalPower = (numberList: (string | undefined)[]) => {
  return calculateTotalNumber(compact(numberList))
}
