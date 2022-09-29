interface CaseType {
  name: string
  brand: string
  series: string
  type: string
  motherboardCompatibility: string[]
  window: string
  maxGPULength: number
  maxPSULength: number
  maxCPUCoolerLength: number
  radiatorOptions: number[][]
  powerSupplyPos: string
  weight: string
  size: string[]
  color: string
  priceUS: string
  priceHK: string
  priceCN: string
}

export default CaseType
