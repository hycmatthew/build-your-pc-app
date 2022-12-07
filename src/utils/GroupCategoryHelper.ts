import {
  CPUType,
  GPUType,
  MotherboardType,
  PSUType,
  RAMType,
  SSDType,
} from '../constant/objectTypes'

export const getCPUBrand = (items: CPUType[]) => {
  return [...new Set(items.map((item: CPUType) => item.brand))]
}

export const getGPUBrand = (items: GPUType[]) => {
  return [...new Set(items.map((item: GPUType) => item.brand))]
}

export const getGPUManufacturer = (items: GPUType[]) => {
  return [...new Set(items.map((item: GPUType) => item.manufacturer))]
}

export const getGPUType = (items: GPUType[]) => {
  return [...new Set(items.map((item: GPUType) => item.gpu))]
}

export const getMotherboardBrand = (items: MotherboardType[]) => {
  return [...new Set(items.map((item: MotherboardType) => item.brand))]
}

export const getMotherboardChipset = (items: MotherboardType[]) => {
  return [...new Set(items.map((item: MotherboardType) => item.chipset))]
}

export const getRAMBrand = (items: RAMType[]) => {
  return [...new Set(items.map((item: RAMType) => item.brand))]
}

export const getRAMGeneration = (items: RAMType[]) => {
  return [...new Set(items.map((item: RAMType) => item.type))]
}

export const getSSDBrand = (items: SSDType[]) => {
  return [...new Set(items.map((item: SSDType) => item.brand))]
}

export const getPSUBrand = (items: PSUType[]) => {
  return [...new Set(items.map((item: PSUType) => item.brand))]
}

export const getSSDCapacity = (items: SSDType[]) => {
  return [...new Set(items.map((item: SSDType) => item.capacity))]
}
