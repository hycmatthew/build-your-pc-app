import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

import AppLayout from '../../common/AppLayout'
import BenchmarksTable from '../components/BenchmarksTable'
import ProductEnum from '../../../constant/ProductEnum'

function Benchmarks() {
  const [itemType, setItemType] = React.useState(ProductEnum.CPU)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: ProductEnum
  ) => {
    setItemType(newType)
  }

  return (
    <AppLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ToggleButtonGroup
            color="primary"
            value={itemType}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value={ProductEnum.CPU}>CPU</ToggleButton>
            <ToggleButton value={ProductEnum.GPU}>GPU</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <BenchmarksTable selectedType="cpu" />
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default Benchmarks
