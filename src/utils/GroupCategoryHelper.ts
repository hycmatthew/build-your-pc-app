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

export const getMotherboardBrand = (items: MotherboardType[]) => {
  return [...new Set(items.map((item: MotherboardType) => item.brand))]
}

export const getRAMBrand = (items: RAMType[]) => {
  return [...new Set(items.map((item: RAMType) => item.brand))]
}

export const getSSDBrand = (items: SSDType[]) => {
  return [...new Set(items.map((item: SSDType) => item.brand))]
}

export const getPSUBrand = (items: PSUType[]) => {
  return [...new Set(items.map((item: PSUType) => item.brand))]
}
