import { toNumber } from 'lodash'
import { MotherboardType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { motherboardIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetPriceList, getPriceFactor } from '../../module/aiComponentList/logic/pricingLogic'
import { motherboardChipsetSuggestion, motherboardOverclockSuggestion } from '../suggestionLogic'

const getItemMotherboardScore = (motherboard: MotherboardType, budget: number) => {
  const ratioList = [1, 1, 1, 2, 2, 3]
  const priceList = getBudgetPriceList()

  let motherboardLevel = 0
  priceList.forEach((element, index) => {
    if (budget < element) {
      motherboardLevel = ratioList[index]
        ? ratioList[index]
        : ratioList[ratioList.length - 1]
    }
  })

  const score = 10000 - (toNumber(motherboard[getSelectedCurrency()]) * getPriceFactor())
  return score
}

const selectMotherboardLogic = (
  buildLogic: BuildLogicState,
  motherboardList: MotherboardType[]
) => {
  let selectedMotherboard: MotherboardType | null = null
  let currentScore = 0

  const filteredList = motherboardList.filter((item) => {
    return (!motherboardIncompatible(item, buildLogic.preSelectedItem) && !motherboardChipsetSuggestion(item, buildLogic.preSelectedItem.cpu) && !motherboardOverclockSuggestion(item, buildLogic.preSelectedItem.cpu))
  }).sort((a: MotherboardType, b:MotherboardType) => toNumber(b?.[getSelectedCurrency()]) - toNumber(a?.[getSelectedCurrency()]))

  filteredList.forEach((item: MotherboardType) => {
    const tempScore = getItemMotherboardScore(item, buildLogic.budget)
    if (tempScore > currentScore) {
      selectedMotherboard = item
      currentScore = tempScore
    }
  })
  return selectedMotherboard
}

export default selectMotherboardLogic
