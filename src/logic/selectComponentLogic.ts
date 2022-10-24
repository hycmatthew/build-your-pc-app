import { CPUType } from "../constant/objectTypes"

export const selectComponentLogic = (budget: number, type: number) => {
  return budget < 10000 ? budget*0.25 : budget*0.20
}

export const selectCPULogic = (budget: number, cpuList: CPUType[]) => {
  return cpuList[0]
}