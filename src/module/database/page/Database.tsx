import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Stack, Box } from '@mui/material'

import { useSelector } from 'react-redux'
import AppLayout from '../../common/AppLayout'
import ItemInfoTable from '../components/ItemInfoTable'
import SelectElement from '../../common/components/Select'
import {
  generateAIOSelectElement,
  generateCaseSelectElement,
  generateCPUSelectElement,
  generateGPUSelectElement,
  generateMotherboardSelectElement,
  generateSSDSelectElement,
  generatePSUSelectElement,
  generateRAMSelectElement,
  generateAirCoolerSelectElement,
} from '../../common/utils/generateSelectElements'
import ProductEnum from '../../../constant/ProductEnum'

function Database() {
  const categoryList = Object.values(ProductEnum)

  const dataState = useSelector((state: any) => {
    return state
  })

  const [selectedType, setSelectedType] = useState(ProductEnum.CPU)
  const [selectedItem, setSelectedItem] = useState(null)

  const updateSelectedItem = (item: any) => {
    setSelectedItem(selectedItem)
  }

  const createSelectLogic = (type: string) => {
    switch (type) {
      case ProductEnum.CPU:
        return (
          <SelectElement
            label={type}
            options={generateCPUSelectElement(dataState.cpuList)}
            selectChange={updateSelectedItem}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.Motherboard:
        return (
          <SelectElement
            label={type}
            options={generateMotherboardSelectElement(
              dataState.motherboardList
            )}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.GPU:
        return (
          <SelectElement
            label={type}
            options={generateGPUSelectElement(dataState.gpuList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.RAM:
        return (
          <SelectElement
            label={type}
            options={generateRAMSelectElement(dataState.ramList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.SSD:
        return (
          <SelectElement
            label={type}
            options={generateSSDSelectElement(dataState.ssdList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.PSU:
        return (
          <SelectElement
            label={type}
            options={generatePSUSelectElement(dataState.psuList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.ComputerCase:
        return (
          <SelectElement
            label={type}
            options={generateCaseSelectElement(dataState.caseList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.AIO:
        return (
          <SelectElement
            label={type}
            options={generateAIOSelectElement(dataState.aioList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
        )
      case ProductEnum.AirCooler:
        return (
          <SelectElement
            label={type}
            options={generateAirCoolerSelectElement(dataState.airCoolerList)}
            selectChange={() => {}}
            isLoading={dataState.isLoading}
          />
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
