import { toNumber } from 'lodash'
import { PSUType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList } from '../LogicUtil/pricingLogic'

const getItemPSUBudget = (budget: number) => {
  const ratioList = [0.4, 0.35, 0.3, 0.25]
  const priceList = getBudgetPriceList()

  let psuBudget = 0
  priceList.forEach((element, index) => {
    if (budget < element) {
      const setRatio = ratioList[index]
        ? ratioList[index]
        : ratioList[ratioList.length - 1]
      psuBudget = budget * setRatio
    }
  })
  return psuBudget
}

const selectPSULogic = (buildLogic: BuildLogicState, psuList: PSUType[]) => {
  const psuBudget = getItemPSUBudget(buildLogic.budget)
  let selectedpsu: PSUType | null = null
  let currentScore = 0
  psuList.forEach((item: PSUType) => {
    if (psuBudget > toNumber(item[getSelectedCurrency()])) {
    }
  })
  return selectedpsu
}

export default selectPSULogic
