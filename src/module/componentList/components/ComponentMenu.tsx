import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import isEmpty from 'lodash/isEmpty'
import flatten from 'lodash/flatten'

import SelectElement from '../../common/components/Select'
import { DataState, sliceActions } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'
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
  generateAIOSelectElement,
  generateCaseSelectElement,
  generateCPUSelectElement,
  generateGPUSelectElement,
  generateMotherboardSelectElement,
  generatePSUSelectElement,
  generateRAMSelectElement,
} from '../../common/utils/generateSelectElements'
import { getTotalPower } from '../../../utils/NumberHelper'
import {
  caseIncompatibleWithGPU,
  motherboardIncompatibleWithCPU,
  psuPowerNotEnough,
  ramIncompatibleWithCPU,
  ramIncompatibleWithMotherboard,
  caseIncompatibleWithMotherboard,
  caseIncompatibleWithAIO,
} from '../../../logic/incompatibleLogic'

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
    aioList,
    isLoading,
  } = dataState

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

  const searchAIOItem = (name: string) => {
    return aioList.find((item: AIOType) => {
      return item.name === name
    })
  }

  const motherboardIncompatible = (item: MotherboardType) => {
    return motherboardIncompatibleWithCPU(item, selectedItems.cpu)
  }

  const ramIncompatible = (item: RAMType) => {
    const sameChipset = ramIncompatibleWithCPU(item, selectedItems.cpu)
    const isMotherboardSupport = ramIncompatibleWithMotherboard(
      item,
      selectedItems.motherboard
    )
    return sameChipset || isMotherboardSupport
  }

  const psuIncompatible = (item: PSUType) => {
    return psuPowerNotEnough(item.watt, getTotalPower(selectedItems))
  }

  const caseIncompatible = (item: CaseType) => {
    const gpuLengthValid = caseIncompatibleWithGPU(item, selectedItems.gpu)
    const motherboardValid = caseIncompatibleWithMotherboard(
      item,
      selectedItems.motherboard
    )
    const aioValid = caseIncompatibleWithAIO(item, selectedItems.aio)
    return gpuLengthValid || motherboardValid || aioValid
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
        case 'liquid-cpu-cooler': {
          const selectedItem = searchAIOItem(value)
          dispatch(sliceActions.updateSelectedAIO(selectedItem))
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
          options={generateCPUSelectElement(cpuList)}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="gpu"
          options={generateGPUSelectElement(gpuList)}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="motherboard"
          options={generateMotherboardSelectElement(
            motherboardList,
            motherboardIncompatible
          )}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="ram"
          options={generateRAMSelectElement(
            ramList,
            ramIncompatible
          )}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="psu"
          placeholder="select"
          options={generatePSUSelectElement(
            psuList,
            psuIncompatible
          )}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="computer-case"
          placeholder="select"
          options={generateCaseSelectElement(
            caseList,
            caseIncompatible
          )}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="liquid-cpu-cooler"
          placeholder="select"
          options={generateAIOSelectElement(aioList)}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  )
}
export default ComponentMenu
