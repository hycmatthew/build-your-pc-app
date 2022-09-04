import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'

import AppLayout from '../../common/AppLayout'
import BenchmarksTable from '../components/BenchmarksTable'

function Benchmarks() {
  return (
    <AppLayout>
      <Grid>
        <BenchmarksTable selectedType="cpu" />
      </Grid>
    </AppLayout>
  )
}

export default Benchmarks
