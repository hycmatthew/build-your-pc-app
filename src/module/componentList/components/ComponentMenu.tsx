import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import isEmpty from 'lodash/isEmpty'

import CPUType from '../../../constant/objectTypes/CPUType'
import SelectElement from '../../common/components/Select'
import { sliceActions } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'
import { getCurrentPrice } from '../../../utils/NumberHelper'

type ComponentMenuProps = {
  dataList: CPUType[]
  isLoading: boolean
}

const ComponentMenu = ({ dataList, isLoading }: ComponentMenuProps) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const generateCPUSelectElement = () => {
    const tempMap = dataList.map((item: CPUType) => {
      const price = getCurrentPrice(item.priceUS, item.priceHK, item.priceCN, i18n.language)
      return { label: item.name, value: price }
    })
    return tempMap
  }

  const searchCPUItem = (name: string) => {
    return dataList.find((item: CPUType) => {
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
        case 'mothernoard':
          dispatch(sliceActions.updateSelectedMotherBoard(value))
          break
        case 'ram':
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
          options={generateCPUSelectElement()}
          selectChange={changeSelectItem}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectElement
          label="motherboard"
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
