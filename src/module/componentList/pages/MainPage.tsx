import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../store/store'

import { getCPUDataList } from '../../store/rawDataReducer'
import AppLayout from '../../common/AppLayout'
import ComponentMenu from '../components/ComponentMenu'
import Calculator from '../components/Calculator'
import PowerCalculator from '../components/PowerCalculator'

function MainPage() {
  const dispatch = useAppDispatch()

  const dataStatus = useSelector((state: any) => {
    return state
  })

  useEffect(() => {
    if (dataStatus.cpuList.length === 0) {
      console.log('test')
      dispatch(getCPUDataList())
    }
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={6}>
          <ComponentMenu
            dataList={dataStatus.cpuList}
            isLoading={dataStatus.isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <PowerCalculator selectedItems={dataStatus.selectedItems} />
          <Calculator selectedItems={dataStatus.selectedItems} />
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default MainPage
