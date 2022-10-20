import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import AOS from 'aos'
import 'aos/dist/aos.css'

import CPUType from '../../../constant/objectTypes/CPUType'
import {
  getCurrentPriceWithSign,
} from '../../../utils/NumberHelper'

function CPUBenchmarksTable() {
  const { t, i18n } = useTranslation()
  const [selectedField, setSelectedField] = useState('multiScore')
  const [showBar, setShowBar] = useState(false)

  const dataStatus = useSelector((state: any) => {
    return state
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
    const maxWidth = 500
    let setLength = 1
    const dutation = index * 250 + 800

    switch (type) {
      case 'singleScore':
        setLength = score / 2500
        break
      default:
        setLength = score / 40000
        break
    }
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
      width: 250,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'singleScore',
      headerName: 'Single Score',
      width: selectedField === 'singleScore' ? 550 : 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.field === selectedField
              ? benchmarksBarWidth(params.field, params.value, params.row.index)
              : ''}
            <Typography variant="subtitle2">{params.value}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'multiScore',
      headerName: 'Multi Score',
      width: selectedField === 'multiScore' ? 550 : 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.field === selectedField
              ? benchmarksBarWidth(params.field, params.value, params.row.index)
              : ''}
            <Typography variant="subtitle2">{params.value}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      editable: false,
      disableColumnMenu: true,
    },
  ]

  const createListOptions = () => {
    let tempOptions: any[] = []
    tempOptions = dataStatus.cpuList.map((item: CPUType, index: number) => {
      return {
        id: `${item.brand} ${item.name}`,
        index,
        singleScore: item.singleCoreScore,
        multiScore: item.multiCoreScore,
        price: getCurrentPriceWithSign(
          item.priceUS,
          item.priceHK,
          item.priceCN,
          i18n.language
        ),
      }
    })
    return tempOptions.sort((a, b) => b.multiScore - a.multiScore)
  }

  const handleColumnHeaderClick = (fieldName: string) => {
    if (fieldName === 'singleScore' || fieldName === 'multiScore') {
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

export default CPUBenchmarksTable
