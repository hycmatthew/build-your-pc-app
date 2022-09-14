import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppLayout from '../../common/AppLayout'
import ComponentMenu from '../components/ComponentMenu'
import Calculator from '../components/Calculator'
import PowerCalculator from '../components/PowerCalculator'

function MainPage() {
  const dataStatus = useSelector((state: any) => {
    return state
  })

  return (
    <AppLayout>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={6}
        columns={{ sm: 6, md: 12 }}
      >
        <Grid item xs={6}>
          <ComponentMenu
            cpuList={dataStatus.cpuList}
            gpuList={dataStatus.gpuList}
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
