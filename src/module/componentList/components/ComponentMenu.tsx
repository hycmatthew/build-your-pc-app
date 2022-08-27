import React from 'react'
import Grid from '@mui/material/Grid'
import isEmpty from 'lodash/isEmpty'

import CPUType from '../../../constant/objectTypes/CPUType'
import SelectElement from '../../common/components/Select'
import { sliceActions } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'

type ComponentMenuProps = {
  dataList: CPUType[]
  isLoading: boolean
}

const ComponentMenu = ({ dataList, isLoading }: ComponentMenuProps) => {
  const dispatch = useAppDispatch()

  const generateCPUSelectElement = () => {
    const tempMap = dataList.map((item: CPUType) => {
      return { label: item.name, value: item.name }
    })
    return tempMap
  }

  const searchCPUItem = (test: string) => {
    return dataList.find((item: CPUType) => {
      return item.name === test
    })
  }

  const changeSelectItem = (value: string, type: string) => {
    if (!isEmpty(value)) {
      switch (type) {
        case 'CPU': {
          const selectedItem = searchCPUItem(value)
          console.log(selectedItem)
          dispatch(sliceActions.updateSelectedCPU(selectedItem))
          break
        }
        case 'MotherBoard':
          dispatch(sliceActions.updateSelectedMotherBoard(value))
          break
        case 'RAM':
          dispatch(sliceActions.updateSelectedRAM(value))
          break
        default:
          break
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectElement
          label="CPU"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="MotherBoard"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="RAM"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={() => {}}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  )
}
export default ComponentMenu
