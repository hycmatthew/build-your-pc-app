import { toNumber } from 'lodash'
import { RAMType } from '../../constant/objectTypes'
import { BuildLogicState } from '../../module/aiComponentList/store/aiLogicReducer'
import { ramIncompatible } from '../../module/common/utils/compatibleLogic'
import { getSelectedCurrency } from '../../utils/NumberHelper'
import { ramPerformanceLogic } from '../performanceLogic'

const selectRAMLogic = (buildLogic: BuildLogicState, ramList: RAMType[]) => {
  let selectedRAM: RAMType | null = null
  let currentScore = 0
  ramList.forEach((item: RAMType) => {
    const ramValid = ramIncompatible(item, buildLogic.preSelectedItem)
    if (
      !ramValid && buildLogic.budget > toNumber(item[getSelectedCurrency()])
    ) {
      const performance = ramPerformanceLogic(item.speed, item.cl)
      selectedRAM = item
      currentScore = performance
    }
  })
  return selectedRAM
}

export default selectRAMLogic
