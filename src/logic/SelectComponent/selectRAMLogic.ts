import { toNumber } from 'lodash'
import { RAMType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { ramIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList } from '../../module/aiComponentList/logic/pricingLogic'
import { ramPerformanceLogic } from '../performanceLogic'

const getItemRAMBudget = (budget: number) => {
  const ratioList = [0.3, 0.3, 0.25, 0.2]
  const priceList = getBudgetPriceList()

  let ramBudget = 0
  priceList.forEach((element, index) => {
    if (budget < element) {
      const setRatio = ratioList[index]
        ? ratioList[index]
        : ratioList[ratioList.length - 1]
      ramBudget = budget * setRatio
    }
  })
  return ramBudget
}

const selectRAMLogic = (buildLogic: BuildLogicState, ramList: RAMType[]) => {
  let selectedRAM: RAMType | null = null
  let currentScore = 0
  const ramBudget = getItemRAMBudget(buildLogic.budget)

  ramList.forEach((item: RAMType) => {
    const ramValid = ramIncompatible(item, buildLogic.preSelectedItem)
    if (!ramValid && ramBudget > toNumber(item[getSelectedCurrency()])) {
      const performance = ramPerformanceLogic(item.speed, item.cl)
      if (performance > currentScore) {
        selectedRAM = item
        currentScore = performance
      }
    }
  })
  return selectedRAM
}

export default selectRAMLogic
