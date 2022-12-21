import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import AOS from 'aos'
import 'aos/dist/aos.css'

import GPUType from '../../../constant/objectTypes/GPUType'
import { getSelectedCurrency, stringToNumber, stringToNumberWithDP } from '../../../utils/NumberHelper'
import { generateItemName, priceLabelHandler } from '../../../utils/LabelHelper'
import BarMotion from '../../../animation/BarMotion'
import BenchmarksDataGrid from './BenchmarksDataGrid'

function GPUBenchmarksTable() {
  const { t, i18n } = useTranslation()
  const [selectedField, setSelectedField] = useState('timespyScore')
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
    const maxWidth = 400
    let setLength = 1
    const dutation = index * 250 + 800

    switch (type) {
      case 'timespyScore':
        setLength = score / 45000
        break
      default:
        setLength = score / 50000
        break
    }
    return (
      <BarMotion>
        <Box
          sx={{
            width: setLength * maxWidth,
            backgroundColor: colorList[index % 7],
            borderRadius: 3,
            height: 12,
          }}
        />
      </BarMotion>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('name'),
      sortable: false,
      width: 350,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: 'timespyScore',
      headerName: 'Time Spy Score',
      width: selectedField === 'timespyScore' ? 450 : 150,
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
      field: 'firestrikeScore',
      headerName: 'Fire Strike Score',
      width: selectedField === 'firestrikeScore' ? 450 : 150,
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
      headerName: t('price'),
      width: 160,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => priceLabelHandler(params.value)
    },
  ]

  const createListOptions = () => {
    let tempOptions: any[] = []
    tempOptions = dataState.gpuList.map((item: GPUType, index: number) => {
      return {
        id: generateItemName(item.brand, item.model),
        index,
        timespyScore: item.timespyScore,
        firestrikeScore: item.firestrikeScore,
        price: stringToNumberWithDP(item[getSelectedCurrency()]),
      }
    })
    return tempOptions.sort((a, b) => b.timespyScore - a.timespyScore)
  }

  const handleColumnHeaderClick = (fieldName: string) => {
    if (fieldName === 'timespyScore' || fieldName === 'firestrikeScore') {
      setSelectedField(fieldName)
    }
  }

  return (
    <BenchmarksDataGrid
      rows={createListOptions()}
      columns={columns}
      headerClick={handleColumnHeaderClick}
    />
  )
}

export default GPUBenchmarksTable
