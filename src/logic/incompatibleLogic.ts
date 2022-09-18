import { isEmpty } from 'lodash'
import RAMType from '../constant/objectTypes/RAMType'

export const motherboardIncompatible = (cpuSocket: string | undefined, motherboardSocket: string | undefined) => {
  return (!isEmpty(cpuSocket) && !isEmpty(motherboardSocket) && cpuSocket !== motherboardSocket)
}

export const ramIncompatible = (cpuBrand: string | undefined, motherboardSupportRam: string | undefined, ram: RAMType) => {
  const sameChipset = (!isEmpty(cpuBrand) && !ram.chipset.includes(cpuBrand ?? ''))
  const isMotherboardSupport = (!isEmpty(motherboardSupportRam) && !(motherboardSupportRam ?? '').includes(ram.speed))
  return sameChipset || isMotherboardSupport
}
