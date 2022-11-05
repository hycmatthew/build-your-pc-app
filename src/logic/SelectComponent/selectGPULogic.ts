import { toNumber } from 'lodash'
import i18n from '../../config/i18n'
import { GPUType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { gpuIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'

const getGPUBudget = (budget: number) => {
  const ratioList = [0, 0.25, 0.3, 0.4, 0.5]
  const priceList = () => {
    switch (i18n.language) {
      case 'zh-TW':
        return [2000, 4000, 6500, 9000, 15000]
      case 'zh-CN':
        return [2000, 4000, 6500, 9000, 15000]
      default:
        return [300, 500, 900, 1400, 2000]
    }
  }

  let gpuBudget = 0
  priceList().forEach((element, index) => {
    if (budget < element) {
      gpuBudget = budget * ratioList[index]
    }
  })
  return gpuBudget
}

const selectGPULogic = (buildLogic: BuildLogicState, gpuList: GPUType[]) => {
  let selectedGPU: GPUType | null = null
  let currentScore = 0
  gpuList.forEach((item: GPUType) => {
    const gpuValid = gpuIncompatible(item, buildLogic.preSelectedItem)
    if (
      !gpuValid && buildLogic.budget > toNumber(item[getSelectedCurrency()])
    ) {
      selectedGPU = item
      currentScore = 100
    }
  })
  return selectedGPU
}

export default selectGPULogic
