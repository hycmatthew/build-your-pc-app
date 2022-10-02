import i18n from '../../../config/i18n'
import {
  CPUType,
  GPUType,
  MotherboardType,
  RAMType,
  PSUType,
  CaseType,
  AIOType,
} from '../../../constant/objectTypes'
import {
  getCurrentPrice
} from '../../../utils/NumberHelper'

export const generateCPUSelectElement = (
  list: CPUType[],
  disableFunc?: (item: CPUType) => boolean,
) => {
  const tempMap = list.map((item: CPUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generateGPUSelectElement = (
  list: GPUType[],
  disableFunc?: (item: GPUType) => boolean,
) => {
  const tempMap = list.map((item: GPUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generateMotherboardSelectElement = (
  list: MotherboardType[],
  disableFunc?: (item: MotherboardType) => boolean,
) => {
  const tempMap = list.map((item: MotherboardType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )

    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generateRAMSelectElement = (
  list: RAMType[],
  disableFunc?: (item: RAMType) => boolean,
) => {
  const tempMap = list.map((item: RAMType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    const itemLabel = item.brand
      .concat(' ')
      .concat(item.series)
      .concat(' ')
      .concat(item.name)

    return { label: itemLabel, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generatePSUSelectElement = (
  list: PSUType[],
  disableFunc?: (item: PSUType) => boolean,
) => {
  const tempMap = list.map((item: PSUType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generateCaseSelectElement = (
  list: CaseType[],
  disableFunc?: (item: CaseType) => boolean,
) => {
  const tempMap = list.map((item: CaseType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )
    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}

export const generateAIOSelectElement = (
  list: AIOType[],
  disableFunc?: (item: AIOType) => boolean,
) => {
  const tempMap = list.map((item: AIOType) => {
    const price = getCurrentPrice(
      item.priceUS,
      item.priceHK,
      item.priceCN,
      i18n.language
    )

    return { label: item.name, value: price, disabled: disableFunc ? disableFunc(item) : false }
  })
  return tempMap
}
