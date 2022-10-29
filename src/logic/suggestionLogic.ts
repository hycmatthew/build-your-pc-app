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
  let suggest = true
  if (cpu && motherboard) {
    let cpuBrand = cpu?.brand
    if (cpuBrand === CPUBrand.Intel) {
      if(cpu?.name.includes('K')){
        return !motherboard?.chipset.includes('Z')
      }
    }else{
      if(cpu?.name.includes('X')){
        return !(motherboard?.chipset.includes('X') || motherboard?.chipset.includes('B'))
      }
    }
  }
  return suggest
}
