import { toNumber } from 'lodash'
import { RAMType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { ramIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { convertCurrency, getPricingFactor, isEnoughBudget } from '../../module/aiComponentList/logic/pricingLogic'
import { ramProfileIsNotMatchCPU } from '../suggestionLogic'
import buildConfig from '../../module/aiComponentList/data/buildConfig'
import { ramPerformanceLogic } from '../performanceLogic'

const ramCapacityScore = (capacity: number) => {
  let score = capacity / 16
  if (capacity === 64) {
    score = 3
  }
  return score
}

const getItemRamScore = (item: RAMType, budget: number) => {
  const ratioList = buildConfig.ramFactor.RAMBudgetFactor
  const priceFactor = getPricingFactor(budget, ratioList)
  const performanceScore = ramPerformanceLogic(item.speed, item.cl) * ramCapacityScore(item.capacityNum)
  return performanceScore - convertCurrency(toNumber(item[getSelectedCurrency()]))
}

const ramFilterLogic = (
  item: RAMType,
  buildLogic: BuildLogicState
) => {
  const compatible = !ramIncompatible(item, buildLogic.preSelectedItem)
  const chipsetSuggestion = !ramProfileIsNotMatchCPU(
    item,
    buildLogic.preSelectedItem.cpu
  )
  const enoughBudget = isEnoughBudget(
    buildLogic.budget,
    item[getSelectedCurrency()]
  )
  return compatible && chipsetSuggestion && enoughBudget
}

const selectRAMLogic = (buildLogic: BuildLogicState, ramList: RAMType[]) => {
  let selectedRAM: RAMType | null = null
  let currentScore = 0

  const filteredList = ramList.filter((item) => {
    return ramFilterLogic(item, buildLogic)
  })

  filteredList.forEach((item: RAMType) => {
    const tempScore = getItemRamScore(item, buildLogic.budget)
    if (tempScore > currentScore) {
      selectedRAM = item
      currentScore = tempScore
    }
  })
  return selectedRAM
}

export default selectRAMLogic
