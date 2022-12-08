import { toNumber } from 'lodash'
import { CPUType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList } from '../../module/aiComponentList/logic/pricingLogic'
import { cpuShouldHaveInternalGPU } from '../suggestionLogic'

const getItemCPUBudget = (budget: number) => {
  const ratioList = [0.4, 0.35, 0.3, 0.25]
  const priceList = getBudgetPriceList()

  let cpuBudget = 0
  priceList.forEach((element, index) => {
    if (budget < element) {
      const setRatio = ratioList[index]
        ? ratioList[index]
        : ratioList[ratioList.length - 1]
      cpuBudget = budget * setRatio
    }
  })
  return cpuBudget
}

const selectCPULogic = (buildLogic: BuildLogicState, cpuList: CPUType[]) => {
  const cpuBudget = getItemCPUBudget(buildLogic.budget)
  let selectedCPU: CPUType | null = null
  let currentScore = 0
  cpuList.forEach((item: CPUType) => {
    if (cpuShouldHaveInternalGPU(item) && cpuBudget > toNumber(item[getSelectedCurrency()])) {
      if (item.multiCoreScore + item.singleCoreScore > currentScore) {
        selectedCPU = item
        currentScore = item.multiCoreScore + item.singleCoreScore
      }
    }
  })
  return selectedCPU
}

export default selectCPULogic
