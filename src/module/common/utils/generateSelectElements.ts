import {
  CPUType,
  GPUType,
  MotherboardType,
  RAMType,
  PSUType,
  CaseType,
  AIOType,
  SSDType,
  AirCoolerType,
} from '../../../constant/objectTypes'
import { generateItemName } from '../../../utils/LabelHelper'
import { getCurrentPrice } from '../../../utils/NumberHelper'
import { SelectedItemType } from '../../store/rawDataReducer'
import {
  airCoolerIncompatible,
  caseIncompatible,
  cpuIncompatible,
  motherboardIncompatible,
  psuIncompatible,
  ramIncompatible,
} from './compatibleLogic'

export const generateCPUSelectElement = (
  list: CPUType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: CPUType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.name)

    return {
      model: item.name,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems ? cpuIncompatible(item, selectedItems) : false,
    }
  })
  return tempMap.filter((item: any) => item.price !== '0.00')
}

export const generateGPUSelectElement = (
  list: GPUType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: GPUType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.model)

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateMotherboardSelectElement = (
  list: MotherboardType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: MotherboardType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.model)

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems
        ? motherboardIncompatible(item, selectedItems)
        : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateRAMSelectElement = (
  list: RAMType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: RAMType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.model)

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems ? ramIncompatible(item, selectedItems) : false,
    }
  })
  return tempMap
    .filter((item: any) => item.value !== '0.00')
    .sort((a, b) => a.brand.localeCompare(b.brand))
}

export const generatePSUSelectElement = (
  list: PSUType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: PSUType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.model)

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems ? psuIncompatible(item, selectedItems) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateCaseSelectElement = (
  list: CaseType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: CaseType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.model)
    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems ? caseIncompatible(item, selectedItems) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateAIOSelectElement = (
  list: AIOType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: AIOType) => {
    const price = getCurrentPrice(item)

    return {
      model: item.model,
      brand: item.brand,
      label: item.name,
      value: price,
      disabled: false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateSSDSelectElement = (
  list: SSDType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: SSDType) => {
    const price = getCurrentPrice(item)
    const itemLabel = `${item.brand} ${item.series} ${item.capacity}  ${item.sizeType}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateAirCoolerSelectElement = (
  list: AirCoolerType[],
  selectedItems?: SelectedItemType
) => {
  const tempMap = list.map((item: AirCoolerType) => {
    const price = getCurrentPrice(item)
    const itemLabel = generateItemName(item.brand, item.name)

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: selectedItems
        ? airCoolerIncompatible(item, selectedItems)
        : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}
