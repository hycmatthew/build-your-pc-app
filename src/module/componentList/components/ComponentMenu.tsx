import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import isEmpty from 'lodash/isEmpty'

import CPUType from '../../../constant/objectTypes/CPUType'
import GPUType from '../../../constant/objectTypes/GPUType'
import MotherboardType from '../../../constant/objectTypes/MotherboardType'
import SelectElement from '../../common/components/Select'
import { DataState, sliceActions } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'
import {
  getCurrentPrice,
  getTotalPower,
  stringToNumber,
} from '../../../utils/NumberHelper'
import RAMType from '../../../constant/objectTypes/RAMType'
import {
  caseIncompatibleWithGPU,
  caseIncompatibleWithMotherboard,
  motherboardIncompatible,
  psuIncompatible,
  ramIncompatible,
} from '../../../logic/incompatibleLogic'
import PSUType from '../../../constant/objectTypes/PSUType'
import CaseType from '../../../constant/objectTypes/CaseType'

type ComponentMenuProps = {
  dataState: DataState
}

const ComponentMenu = ({ dataState }: ComponentMenuProps) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const {
    selectedItems,
    cpuList,
    gpuList,
    motherboardList,
    ramList,
    psuList,
    caseList,
    isLoading,
  } = dataState

  const generateCPUSelectElement = () => {
    const tempMap = cpuList.map((item: CPUType) => {
      const price = getCurrentPrice(
        item.priceUS,
        item.priceHK,
        item.priceCN,
        i18n.language
      )
      return { label: item.name, value: price, disabled: false }
    })
    return tempMap
  }

  const generateGPUSelectElement = () => {
    const tempMap = gpuList.map((item: GPUType) => {
      const price = getCurrentPrice(
        item.priceUS,
        item.priceHK,
        item.priceCN,
        i18n.language
      )
      return { label: item.name, value: price, disabled: false }
    })
    return tempMap
  }

  const generateMotherboardSelectElement = () => {
    const tempMap = motherboardList.map((item: MotherboardType) => {
      const price = getCurrentPrice(
        item.priceUS,
        item.priceHK,
        item.priceCN,
        i18n.language
      )
      const disable = motherboardIncompatible(
        selectedItems.cpu?.socket,
        item.socket
      )
      return { label: item.name, value: price, disabled: disable }
    })
    return tempMap
  }

  const generateRAMSelectElement = () => {
    const tempMap = ramList.map((item: RAMType) => {
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

      const disable = ramIncompatible(
        selectedItems.cpu?.brand,
        selectedItems.motherboard?.supportedRam,
        item
      )
      return { label: itemLabel, value: price, disabled: disable }
    })
    return tempMap
  }

  const generatePSUSelectElement = () => {
    const tempMap = psuList.map((item: PSUType) => {
      const price = getCurrentPrice(
        item.priceUS,
        item.priceHK,
        item.priceCN,
        i18n.language
      )
      const disable = psuIncompatible(
        getTotalPower(selectedItems),
        stringToNumber(item.watt)
      )
      return { label: item.name, value: price, disabled: disable }
    })
    return tempMap
  }

  const generateCaseSelectElement = () => {
    const tempMap = caseList.map((item: CaseType) => {
      const price = getCurrentPrice(
        item.priceUS,
        item.priceHK,
        item.priceCN,
        i18n.language
      )
      const disableGPULength = caseIncompatibleWithGPU(
        selectedItems.gpu?.length,
        item.maxGPULength
      )
      const disableMotherboardSize = caseIncompatibleWithMotherboard(
        selectedItems.motherboard?.sizeType,
        item.motherboardCompatibility
      )
      const disable = disableGPULength || disableMotherboardSize
      // const disablePSULength = caseIncompatibleWithGPU(selectedItems.gpu?.length, item.maxGPULength)
      return { label: item.name, value: price, disabled: disable }
    })
    return tempMap
  }

  const searchCPUItem = (name: string) => {
    return cpuList.find((item: CPUType) => {
      return item.name === name
    })
  }

  const searchGPUItem = (name: string) => {
    return gpuList.find((item: GPUType) => {
      return item.name === name
    })
  }

  const searchMotherboardItem = (name: string) => {
    return motherboardList.find((item: MotherboardType) => {
      return item.name === name
    })
  }

  const searchRAMItem = (name: string) => {
    return ramList.find((item: RAMType) => {
      return name.includes(item.name)
    })
  }

  const searchPSUItem = (name: string) => {
    return psuList.find((item: PSUType) => {
      return item.name === name
    })
  }

  const searchCaseItem = (name: string) => {
    return caseList.find((item: CaseType) => {
      return item.name === name
    })
  }

  const changeSelectItem = (value: string, type: string) => {
    console.log(type)
    if (!isEmpty(value)) {
      switch (type) {
        case 'cpu': {
          const selectedItem = searchCPUItem(value)
          dispatch(sliceActions.updateSelectedCPU(selectedItem))
          break
        }
        case 'motherboard': {
          const selectedItem = searchMotherboardItem(value)
          dispatch(sliceActions.updateSelectedMotherBoard(selectedItem))
          break
        }
        case 'gpu': {
          const selectedItem = searchGPUItem(value)
          dispatch(sliceActions.updateSelectedGPU(selectedItem))
          break
        }
        case 'ram': {
          const selectedItem = searchRAMItem(value)
          dispatch(sliceActions.updateSelectedRAM(selectedItem))
          break
        }
        case 'psu': {
          const selectedItem = searchPSUItem(value)
          dispatch(sliceActions.updateSelectedPSU(selectedItem))
          break
        }
        case 'computer-case': {
          const selectedItem = searchCaseItem(value)
          dispatch(sliceActions.updateSelectedCase(selectedItem))
          break
        }
        default:
          break
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectElement
          label="cpu"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="gpu"
          placeholder="select"
          options={generateGPUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="motherboard"
          placeholder="select"
          options={generateMotherboardSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="ram"
          placeholder="select"
          options={generateRAMSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="psu"
          placeholder="select"
          options={generatePSUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="computer-case"
          placeholder="select"
          options={generateCaseSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="cpu-cooler"
          placeholder="select"
          options={generateMotherboardSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  )
}
export default ComponentMenu
