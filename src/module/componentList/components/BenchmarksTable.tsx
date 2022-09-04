import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

import CPUType from '../../../constant/objectTypes/CPUType'
import {
  stringToNumber,
  stringToNumberWithDP,
} from '../../../utils/NumberHelper'

type BenchmarksProps = {
  selectedType: string
}

type TableOptionsType = {
  name: string
  score: number
  price: number
}

function BenchmarksTable({ selectedType }: BenchmarksProps) {
  const { t } = useTranslation()

  const dataStatus = useSelector((state: any) => {
    return state
  })

  const createListOptions = () => {
    let tempOptions: TableOptionsType[] = []
    if (selectedType === 'cpu') {
      tempOptions = dataStatus.cpuList.map((item: CPUType) => {
        return {
          name: item.name,
          score: stringToNumber(item.singleCoreScore),
          price: stringToNumberWithDP(item.priceCN),
        }
      })
    }
    return tempOptions
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('cpu')}</TableCell>
            <TableCell align="right">Cinebench</TableCell>
            <TableCell align="right">{t('price')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createListOptions().map((item: TableOptionsType) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.score}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const defaultProps: BenchmarksProps = {
  selectedType: 'cpu',
}

export default BenchmarksTable
