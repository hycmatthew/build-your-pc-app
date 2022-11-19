import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Stack, Box } from '@mui/material'

import { useSelector } from 'react-redux'
import AppLayout from '../../common/AppLayout'
import ItemInfoTable from '../components/ItemInfoTable'
import ProductEnum from '../../../constant/ProductEnum'
import CPUSuggestion from '../components/CPUSuggestion'
import GPUSuggestion from '../components/GPUSuggestion'

import { CPU_FILTER_INIT_DATA } from '../data/FilterInitData'

function Database() {
  const categoryList = Object.values(ProductEnum)

  const dataState = useSelector((state: any) => {
    return state.rawData
  })

  const [selectedType, setSelectedType] = useState(ProductEnum.CPU)

  const createSelectLogic = (type: string) => {
    switch (type) {
      case ProductEnum.CPU:
        return (
          <CPUSuggestion cpuList={dataState.cpuList} isLoading={dataState.isLoading} />
        )
      case ProductEnum.GPU:
        return (
          <GPUSuggestion gpuList={dataState.gpuList} isLoading={dataState.isLoading} />
        )
      default:
        return ''
    }
  }

  return (
    <AppLayout bgColor="#ffffff">
      <Grid justifyContent="center" container>
        <Grid container xs={12} md={8} justifyContent="center" spacing={2}>
          {categoryList.map((item) => (
            <Grid item>
              <Box component="span">
                <Button
                  variant="contained"
                  onClick={() => setSelectedType(item)}
                >
                  {item}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          xs={12}
          md={8}
          justifyContent="center"
          sx={{ paddingTop: '24px' }}
        >
          <Grid item xs={12}>
            {createSelectLogic(selectedType)}
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          md={8}
          justifyContent="center"
          sx={{ paddingTop: '24px' }}
        >
          <Grid item xs={12}>
            <ItemInfoTable />
          </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default Database
