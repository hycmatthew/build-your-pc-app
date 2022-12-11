import { CPUType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { getBudgetByPricingFactor, isEnoughBudget } from '../../module/aiComponentList/logic/pricingLogic'
import buildConfig from '../../module/aiComponentList/data/buildConfig'

const getItemCPUBudget = (budget: number) => {
  return getBudgetByPricingFactor(budget, buildConfig.cpuFactor.CPUBudgetGFactor)
}

export const cpuHaveInternalGPU = (cpu: CPUType) => {
  if (cpu) {
    return cpu.gpu !== ''
  }
  return false
}

const countCPUScore = (item: CPUType) => {
  const singleScore = item.singleCoreScore * buildConfig.cpuFactor.singleCoreMultiply
  const multiScore = item.multiCoreScore * buildConfig.cpuFactor.multiCoreMultiply
  const internalScore = cpuHaveInternalGPU(item) ? 2000 : 0
  return singleScore + multiScore + internalScore
}

const selectCPULogic = (buildLogic: BuildLogicState, cpuList: CPUType[]) => {
  const cpuBudget = getItemCPUBudget(buildLogic.budget)
  let selectedCPU: CPUType | null = null
  let currentScore = 0
  cpuList.forEach((item: CPUType) => {
    if (isEnoughBudget(cpuBudget, item[getSelectedCurrency()])) {
      if (countCPUScore(item) > currentScore) {
        selectedCPU = item
        currentScore = countCPUScore(item)
      }
    }
  })
  return selectedCPU
}

export default selectCPULogic
