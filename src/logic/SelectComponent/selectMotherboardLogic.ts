import { toNumber } from 'lodash'
import i18n from '../../config/i18n'
import { MotherboardType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { motherboardIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList } from '../LogicUtil/pricingLogic'
import { motherboardOverclockSuggestion } from '../suggestionLogic'

const getItemMotherboardBudget = (budget: number) => {
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

const selectMotherboardLogic = (
  buildLogic: BuildLogicState,
  motherboardList: MotherboardType[]
) => {
  let selectedMotherboard: MotherboardType | null = null
  let currentScore = 0
  motherboardList.forEach((item: MotherboardType) => {
    const cpuValid = motherboardIncompatible(item, buildLogic.preSelectedItem)
    if (!cpuValid) {
      if (
        motherboardOverclockSuggestion(item, buildLogic.preSelectedItem.cpu)
      ) {
        const tempScore = buildLogic.budget - toNumber(item[getSelectedCurrency()])
        if (tempScore > currentScore) {
          selectedMotherboard = item
          currentScore = buildLogic.budget - toNumber(item[getSelectedCurrency()])
        }
      }
    }
  })
  return selectedMotherboard
}

export default selectMotherboardLogic
