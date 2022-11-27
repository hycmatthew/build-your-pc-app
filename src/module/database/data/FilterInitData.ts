import {
  CPUFilterType,
  GPUFilterType,
  MotherboardFilterType,
  PSUFilterType,
  RAMFilterType,
  SSDFilterType,
} from './FilterType'

export const CPU_FILTER_INIT_DATA: CPUFilterType = {
  brand: '',
  price: 0,
}

export const GPU_FILTER_INIT_DATA: GPUFilterType = {
  brand: '',
  manufacturer: '',
  price: 0,
}

export const MOTHERBOARD_FILTER_INIT_DATA: MotherboardFilterType = {
  brand: '',
  price: 0,
  size: '',
  chipset: '',
}

export const RAM_FILTER_INIT_DATA: RAMFilterType = {
  brand: '',
  price: 0,
  size: '',
}

export const SSD_FILTER_INIT_DATA: SSDFilterType = {
  brand: '',
  price: 0,
  capacity: '',
}

export const PSU_FILTER_INIT_DATA: PSUFilterType = {
  brand: '',
  price: 0,
  size: '',
}