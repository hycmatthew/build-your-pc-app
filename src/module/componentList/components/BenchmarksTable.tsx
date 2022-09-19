import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import AOS from 'aos'
import 'aos/dist/aos.css'

import CPUType from '../../../constant/objectTypes/CPUType'
import {
  stringToNumber,
  stringToNumberWithDP,
} from '../../../utils/NumberHelper'

type BenchmarksProps = {
  selectedType: string
}

type CPUOptionsType = {
  name: string
  singleScore: number
  multiScore: number
  price: number
}

function BenchmarksTable({ selectedType }: BenchmarksProps) {
  const { t } = useTranslation()
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
    const dutation = (index * 250) + 800

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
    },
    {
      field: 'singleScore',
      headerName: 'Single Score',
      width: selectedField === 'singleScore' ? 550 : 150,
      editable: false,
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
    },
  ]

  const createListOptions = () => {
    let tempOptions: any[] = []
    if (selectedType === 'cpu') {
      tempOptions = dataStatus.cpuList.map((item: CPUType, index: number) => {
        return {
          id: item.name,
          index,
          singleScore: stringToNumber(item.singleCoreScore),
          multiScore: stringToNumber(item.multiCoreScore),
          price: stringToNumberWithDP(item.priceCN),
        }
      })
    }
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

const defaultProps: BenchmarksProps = {
  selectedType: 'cpu',
}

export default BenchmarksTable