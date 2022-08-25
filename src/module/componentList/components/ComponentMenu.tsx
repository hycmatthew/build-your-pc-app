import Grid from '@mui/material/Grid'
import React from 'react'
import CPUType from '../../../constant/objectTypes/CPUType'
import SelectElement from '../../common/components/Select'
import { sliceActions } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'

type ComponentMenuProps = {
  dataList: CPUType[]
}

const ComponentMenu = ({ dataList }: ComponentMenuProps) => {
  const dispatch = useAppDispatch()

  const generateCPUSelectElement = () => {
    return dataList.map((item: CPUType) => {
      return { label: item.name, value: item.name }
    })
  }

  const changeSelectItem = (value: string, type: string) => {
    switch (type) {
      case 'CPU':
        dispatch(sliceActions.updateSelectedCPU(value))
        break
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectElement
          label="CPU"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="MotherBoard"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="RAM"
          placeholder="select"
          options={generateCPUSelectElement()}
          selectChange={() => {}}
        />
      </Grid>
    </Grid>
  )
}

export default ComponentMenu
