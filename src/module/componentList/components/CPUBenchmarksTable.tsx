import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import AOS from 'aos'
import 'aos/dist/aos.css'

import CPUType from '../../../constant/objectTypes/CPUType'
import {
  addCurrencySign, getSelectedCurrency, stringToNumber,
} from '../../../utils/NumberHelper'
import { generateItemName } from '../../../utils/LabelHelper'

function CPUBenchmarksTable() {
  const { t } = useTranslation()
  const [selectedField, setSelectedField] = useState('multiScore')
  const [showBar, setShowBar] = useState(false)

  const dataState = useSelector((state: any) => {
    return state.rawData
  })

  useEffect(() => {
    AOS.init({
      duration: 1500
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
    const dutation = index * 150

    switch (type) {
      case 'singleScore':
        setLength = score / 3500
        break
      default:
        setLength = score / 55000
        break
    }
    return (
      <Box
        data-aos="zoom-in-right"
        data-aos-once="true"
        data-aos-delay={dutation}
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
      headerName: t('name'),
      sortable: false,
      width: 220,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'singleScore',
      headerName: t('single-core'),
      width: selectedField === 'singleScore' ? 450 : 150,
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
      headerName: t('multi-core'),
      width: selectedField === 'multiScore' ? 450 : 150,
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
      field: 'pricePerformance',
      headerName: t('price-performance'),
      width: 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => Number(params.value).toFixed(2)
    },
    {
      field: 'price',
      headerName: t('price'),
      width: 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => addCurrencySign(params.value)
    },
  ]

  const createListOptions = () => {
    let tempOptions: any[] = []
    tempOptions = dataState.cpuList.map((item: CPUType, index: number) => {
      return {
        id: generateItemName(item.brand, item.name),
        index,
        singleScore: item.singleCoreScore,
        multiScore: item.multiCoreScore,
        pricePerformance: (item.multiCoreScore / stringToNumber(item[getSelectedCurrency()])),
        price: stringToNumber(item[getSelectedCurrency()]),
      }
    })
    return tempOptions.sort((a, b) => b.multiCoreScore - a.multiCoreScore)
  }

  const handleColumnHeaderClick = (fieldName: string) => {
    if (fieldName === 'singleScore' || fieldName === 'multiScore') {
      setSelectedField(fieldName)
    }
  }

  return (
    <Box sx={{ height: 900, width: '100%', background: '#fff' }}>
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
