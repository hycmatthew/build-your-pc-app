import { toNumber } from 'lodash'
import { useTranslation } from 'react-i18next'

const GetCurrentPrice = (
  priceUS: string,
  priceHK: string,
  priceCN: string
) => {
  const { i18n } = useTranslation()
  switch (i18n.language) {
    case 'zh-TW':
      return `$${toNumber(priceHK).toFixed(2)}`
    case 'zh-CN':
      return `¥${toNumber(priceCN).toFixed(2)}`
    default:
      return `$${toNumber(priceUS).toFixed(2)}`
  }
}

export default GetCurrentPrice
