import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Stack, Box } from '@mui/material'

import AppLayout from '../../common/AppLayout'
import ItemInfoTable from '../components/ItemInfoTable'

function Database() {
  const categoryList = ['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'aio']

  return (
    <AppLayout bgColor="#ffffff">
      <Grid container>
        <Grid item>
          <Stack direction="column">
            {categoryList.map((item) => (
              <Box component="span" sx={{ p: 1 }}>
                <Button variant="contained" sx={{ width: 140 }}>
                  {item}
                </Button>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default Database
