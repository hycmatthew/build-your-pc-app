import { toNumber } from 'lodash'
import { SSDType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList } from '../LogicUtil/pricingLogic'

const getItemSSDScore = (budget: number) => {
  const ratioList = [0.3, 0.3, 0.25, 0.2]
  const priceList = getBudgetPriceList()

  let ssdBudget = 0
  priceList.forEach((element, index) => {
    if (budget < element) {
      const setRatio = ratioList[index]
        ? ratioList[index]
        : ratioList[ratioList.length - 1]
      ssdBudget = budget * setRatio
    }
  })
  return ssdBudget
}

export const ssdSuggestion = (ssd: SSDType, budget: number) => {
  return true
}

const selectSSDLogic = (buildLogic: BuildLogicState, ssdist: SSDType[]) => {
  let selectedRAM: SSDType | null = null
  const currentScore = 0
  const ssdBudget = getItemSSDScore(buildLogic.budget)

  const filteredSSDList = ssdist.filter((item) => {
    return (item.capacity.toUpperCase().includes('1TB'))
  })

  filteredSSDList.forEach((item: SSDType) => {
    if (ssdBudget > toNumber(item[getSelectedCurrency()])) {
      selectedRAM = item
    }
  })
  return selectedRAM
}

export default selectSSDLogic
