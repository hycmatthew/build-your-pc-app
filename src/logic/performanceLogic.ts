import {
  CPUType,
  GPUType,
  RAMType,
  SSDType
} from '../constant/objectTypes'

export const ramPerformanceLogic = (ram: RAMType | null) => {
  if (ram !== null) {
    return ram.speed - ram.cl * 80
  }
  return 0
}

export const cpuPerformanceLogic = (cpu: CPUType | null) => {
  if (cpu !== null) {
    return cpu.multiCoreScore + cpu.singleCoreScore * 5
  }
  return 0
}

export const gpuPerformanceLogic = (gpu: GPUType | null) => {
  if (gpu !== null) {
    return (gpu.timespyScore + gpu.firestrikeScore) * 0.5
  }
  return 0
}

export const ssdPerformanceLogic = (ssd: SSDType | null) => {
  if (ssd !== null) {
    return (ssd.readSpeed + ssd.writeSpeed) * 0.2 * ssd.score
  }
  return 0
}
