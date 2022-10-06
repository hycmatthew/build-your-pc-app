import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import AppLayout from '../../common/AppLayout'

function ItemInfoTable() {
  const categoryList = ['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'aio']

  return (
    <AppLayout>
      <Grid container>
        <Grid item>
          {categoryList.map((item) => (
            <Button variant="outlined">{item}</Button>
          ))}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </AppLayout>
  )
}

export default ItemInfoTable
