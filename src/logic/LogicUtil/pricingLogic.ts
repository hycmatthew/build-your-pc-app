import i18n from '../../config/i18n'

export const getBudgetPriceList = () => {
  const priceList = [2000, 3000, 4500, 6000, 9000, 12000, 15000]
  switch (i18n.language) {
    case 'zh-TW':
      return priceList
    case 'zh-CN':
      return priceList.map((item) => {
        return item * 0.9
      })
    default:
      return priceList.map((item) => {
        return item * 0.125
      })
  }
}

export const getPriceFactor = () => {
  switch (i18n.language) {
    case 'zh-TW':
      return 1
    case 'zh-CN':
      return 1.1
    default:
      return 8
  }
}
