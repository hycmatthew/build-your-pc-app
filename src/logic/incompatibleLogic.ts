import { flatten, isEmpty } from 'lodash'
import RAMType from '../constant/objectTypes/RAMType'

export const motherboardIncompatible = (cpuSocket: string | undefined, motherboardSocket: string | undefined) => {
  return (!isEmpty(cpuSocket) && !isEmpty(motherboardSocket) && cpuSocket !== motherboardSocket)
}

export const ramIncompatible = (cpuBrand: string | undefined, motherboardSupportRam: string | undefined, ram: RAMType) => {
  const sameChipset = (!isEmpty(cpuBrand) && !ram.chipset.includes(cpuBrand ?? ''))
  const isMotherboardSupport = (!isEmpty(motherboardSupportRam) && !(motherboardSupportRam ?? '').includes(ram.speed))
  return sameChipset || isMotherboardSupport
}

export const psuIncompatible = (totalPower: number, psuPower: number) => {
  return totalPower > psuPower
}

export const caseIncompatibleWithGPU = (gpuLength: number | undefined, maxGPULength: number) => {
  return gpuLength ? gpuLength > maxGPULength : false
}

export const caseIncompatibleWithMotherboard = (size: string | undefined, allowMotherboardSize: string[]) => {
  return size ? !allowMotherboardSize.includes(size) : false
}

export const caseIncompatibleWithAIO = (aioSize: number, caseCompatibleSize: number[][] | undefined) => {
  const compatibleList = caseCompatibleSize ? flatten(caseCompatibleSize) : []
  return caseCompatibleSize ? !compatibleList.includes(aioSize) : false
}
