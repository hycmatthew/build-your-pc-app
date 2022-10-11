import { flatten, isEmpty } from 'lodash'
import {
  CPUType,
  GPUType,
  MotherboardType,
  RAMType,
  CaseType,
  AIOType,
  AirCoolerType,
} from '../constant/objectTypes'

export const motherboardIncompatibleWithCPU = (
  motherboard: MotherboardType,
  cpu: CPUType | null
) => {
  return cpu ? motherboard.socket !== cpu.socket : false
}

export const ramIncompatibleWithCPU = (ram: RAMType, cpu: CPUType | null) => {
  return cpu ? !ram.chipset.includes(cpu.brand) : false
}

export const ramIncompatibleWithMotherboard = (
  ram: RAMType,
  motherboard: MotherboardType | null
) => {
  return motherboard ? !motherboard.supportedRam.includes(ram.speed) : false
}

export const psuPowerNotEnough = (psuPower: number, totalPower: number) => {
  return totalPower > psuPower
}

export const caseIncompatibleWithGPU = (
  pcCase: CaseType,
  gpu: GPUType | null
) => {
  return gpu ? gpu.length > pcCase.maxGPULength : false
}

export const caseIncompatibleWithMotherboard = (
  pcCase: CaseType,
  motherboard: MotherboardType | null
) => {
  return motherboard
    ? !pcCase.motherboardCompatibility.includes(motherboard.sizeType)
    : false
}

export const caseIncompatibleWithAIO = (
  pcCase: CaseType,
  aio: AIOType | null
) => {
  return aio ? !flatten(pcCase.radiatorOptions).includes(aio.fanSize) : false
}

export const airCoolerIncompatibleWithCase = (
  airCooler: AirCoolerType,
  pcCase: CaseType | null
) => {
  return pcCase ? airCooler.maxCoolerHeight > pcCase.maxCPUCoolerLength : false
}
