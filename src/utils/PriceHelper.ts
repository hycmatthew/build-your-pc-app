import { toNumber } from 'lodash'

const GetCurrentPrice = (
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

export default GetCurrentPrice
