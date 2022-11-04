import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { RAMType } from '../../../constant/objectTypes'
import { getCurrentPriceWithSign } from '../../../utils/NumberHelper'
import { ramPerformanceLogic } from '../../../logic/performanceLogic'

function RAMBenchmarksTable() {
  const { t, i18n } = useTranslation()
  const [selectedField, setSelectedField] = useState('speed')
  const [showBar, setShowBar] = useState(false)

  const dataState = useSelector((state: any) => {
    return state.rawData
  })

  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])

  const benchmarksBarWidth = (type: string, score: number, index: number) => {
    const colorList = [
      '#EB5353',
      '#FF7BA9',
      '#FFEEAF',
      '#24A19C',
      '#607EAA',
      '#2666CF',
      '#6166B3',
    ]
    const maxWidth = 450
    const setLength = score / 8000
    const dutation = index * 250 + 800

    return (
      <Box
        data-aos="zoom-in-right"
        data-aos-duration={dutation}
        sx={{
          width: setLength * maxWidth,
          backgroundColor: colorList[index % 7],
          borderRadius: 3,
          height: 12,
        }}
      />
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Name',
      sortable: false,
      width: 330,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'speed',
      headerName: 'Speed',
      width: 120,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'cl',
      headerName: 'Latency (Lower is better)',
      width: 150,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'performance',
      headerName: 'Overall Performance',
      width: 450,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            {benchmarksBarWidth(params.field, params.value, params.row.index)}
            <Typography variant="subtitle2">{params.value}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: false,
      disableColumnMenu: true,
    },
  ]

  const createListOptions = () => {
    let tempOptions: any[] = []
    tempOptions = dataState.ramList.map((item: RAMType, index: number) => {
      return {
        id: `${item.brand} ${item.model}`,
        index,
        speed: item.speed,
        performance: ramPerformanceLogic(item.speed, item.cl),
        cl: item.cl,
        price: getCurrentPriceWithSign(
          item.priceUS,
          item.priceHK,
          item.priceCN,
          i18n.language
        ),
      }
    })
    return tempOptions.sort((a, b) => b.performance - a.performance)
  }

  const handleColumnHeaderClick = (fieldName: string) => {
    if (fieldName === 'speed' || fieldName === 'cl' || fieldName === 'performance') {
      setSelectedField(fieldName)
    }
  }

  return (
    <Box sx={{ height: 1200, width: '100%', background: '#fff' }}>
      <DataGrid
        rows={createListOptions()}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        onColumnHeaderClick={(param) => {
          handleColumnHeaderClick(param.field)
        }}
        sortingOrder={['desc', 'asc', null]}
      />
    </Box>
  )
}

export default RAMBenchmarksTable
