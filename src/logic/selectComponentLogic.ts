import { compact, sum, toNumber } from 'lodash'
import i18n from '../config/i18n'
import { CPUType, GPUType, MotherboardType } from '../constant/objectTypes'
import { BuildLogicState } from '../module/aiComponentList/store/aiLogicReducer'
import {
  gpuIncompatible,
  motherboardIncompatible,
} from '../module/common/utils/compatibleLogic'
import {
  calculateTotalNumber,
  getSelectedCurrency,
} from '../utils/NumberHelper'
import { motherboardOverclockSuggestion } from './suggestionLogic'

export const selectComponentLogic = (budget: number, type: number) => {
  return budget < 10000 ? budget * 0.25 : budget * 0.2
}

const calculateCurrentBudget = (buildLogic: BuildLogicState) => {
  let dataList = [
    buildLogic.preSelectedItem.cpu?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.gpu?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.motherboard?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.ram?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.ssd?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.psu?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.aio?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.pcCase?.[getSelectedCurrency()],
    buildLogic.preSelectedItem.airCooler?.[getSelectedCurrency()],
  ]
  return calculateTotalNumber(compact(dataList))
}

const getItemCPUBudget = (budget: number) => {
  const ratioList = [0.4, 0.35, 0.3, 0.25, 0.25]
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

  let cpuBudget = 0
  priceList().forEach((element, index) => {
    if (budget < element) {
      cpuBudget = budget * ratioList[index]
    }
  })
  return cpuBudget
}

const getMotherboardBudget = (budget: number) => {
  const ratioList = [0.4, 0.35, 0.3, 0.25, 0.25]
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

  let cpuBudget = 0
  priceList().forEach((element, index) => {
    if (budget < element) {
      cpuBudget = budget * ratioList[index]
    }
  })
  return cpuBudget
}

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

export const selectCPULogic = (
  buildLogic: BuildLogicState,
  cpuList: CPUType[]
) => {
  let cpuBudget = getItemCPUBudget(buildLogic.budget)
  let selectedCPU: CPUType | null = null
  let currentScore = 0
  cpuList.forEach((item: CPUType) => {
    if (cpuBudget > toNumber(item[getSelectedCurrency()])) {
      if (item.multiCoreScore + item.singleCoreScore > currentScore) {
        selectedCPU = item
        currentScore = item.multiCoreScore + item.singleCoreScore
      }
    }
  })
  return selectedCPU
}

export const selectMotherboardLogic = (
  buildLogic: BuildLogicState,
  motherboardList: MotherboardType[]
) => {
  let selectedMotherboard: MotherboardType | null = null
  let currentScore = 0
  motherboardList.forEach((item: MotherboardType) => {
    let cpuValid = motherboardIncompatible(item, buildLogic.preSelectedItem)
    if (!cpuValid) {
      if (
        motherboardOverclockSuggestion(item, buildLogic.preSelectedItem.cpu)
      ) {
        let tempScore =
          buildLogic.budget - toNumber(item[getSelectedCurrency()])
        if (tempScore > currentScore) {
          selectedMotherboard = item
          currentScore =
            buildLogic.budget - toNumber(item[getSelectedCurrency()])
        }
      }
    }
  })
  return selectedMotherboard
}

export const selectGPULogic = (
  buildLogic: BuildLogicState,
  gpuList: GPUType[]
) => {
  let selectedGPU: GPUType | null = null
  let currentScore = 0
  gpuList.forEach((item: GPUType) => {
    let gpuValid = gpuIncompatible(item, buildLogic.preSelectedItem)
    if (
      !gpuValid &&
      buildLogic.budget > toNumber(item[getSelectedCurrency()])
    ) {
      selectedGPU = item
      currentScore = 100
    }
  })
  return selectedGPU
}
