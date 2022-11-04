import { CPUBrand } from '../constant/BrandEnum'
import {
  CPUType,
  GPUType,
  MotherboardType,
  RAMType,
  CaseType,
  AIOType,
  AirCoolerType,
} from '../constant/objectTypes'

export const motherboardOverclockSuggestion = (
  motherboard: MotherboardType | null,
  cpu: CPUType | null
) => {
  if (cpu && motherboard) {
    const cpuBrand = cpu?.brand
    if (cpuBrand === CPUBrand.Intel) {
      if (cpu?.name.includes('K')) {
        return !motherboard?.chipset.includes('Z')
      }
    }
    if (cpu?.name.includes('X')) {
      return !(
        motherboard?.chipset.includes('X') || motherboard?.chipset.includes('B')
      )
    }
  }
  return false
}

export const motherboardPriceSuggestion = (
  motherboard: MotherboardType | null,
  cpu: CPUType | null
) => {
  if (cpu && motherboard) {
    
  }
  return false
}