import i18n from '../../../config/i18n'
import {
  CPUType,
  GPUType,
  MotherboardType,
  RAMType,
  PSUType,
  CaseType,
  AIOType,
  SSDType,
  AirCoolerType,
} from '../../../constant/objectTypes'
import { getCurrentPrice } from '../../../utils/NumberHelper'

export const generateCPUSelectElement = (
  list: CPUType[],
  disableFunc?: (item: CPUType) => boolean
) => {
  const tempMap = list.map((item: CPUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.name}`

    return {
      model: item.name,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.price !== '0.00')
}

export const generateGPUSelectElement = (
  list: GPUType[],
  disableFunc?: (item: GPUType) => boolean
) => {
  const tempMap = list.map((item: GPUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.model}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateMotherboardSelectElement = (
  list: MotherboardType[],
  disableFunc?: (item: MotherboardType) => boolean
) => {
  const tempMap = list.map((item: MotherboardType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.model}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateRAMSelectElement = (
  list: RAMType[],
  disableFunc?: (item: RAMType) => boolean
) => {
  const tempMap = list.map((item: RAMType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.series} ${item.model}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generatePSUSelectElement = (
  list: PSUType[],
  disableFunc?: (item: PSUType) => boolean
) => {
  const tempMap = list.map((item: PSUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.model}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateCaseSelectElement = (
  list: CaseType[],
  disableFunc?: (item: CaseType) => boolean
) => {
  const tempMap = list.map((item: CaseType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.series} ${item.type}`
    console.log(price)
    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateAIOSelectElement = (
  list: AIOType[],
  disableFunc?: (item: AIOType) => boolean
) => {
  const tempMap = list.map((item: AIOType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )

    return {
      model: item.model,
      brand: item.brand,
      label: item.name,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateSSDSelectElement = (
  list: SSDType[],
  disableFunc?: (item: SSDType) => boolean
) => {
  const tempMap = list.map((item: SSDType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.series} ${item.capacity}  ${item.sizeType}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}

export const generateAirCoolerSelectElement = (
  list: AirCoolerType[],
  disableFunc?: (item: AirCoolerType) => boolean
) => {
  const tempMap = list.map((item: AirCoolerType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = `${item.brand} ${item.name}`

    return {
      model: item.model,
      brand: item.brand,
      label: itemLabel,
      value: price,
      disabled: disableFunc ? disableFunc(item) : false,
    }
  })
  return tempMap.filter((item: any) => item.value !== '0.00')
}
