import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { SelectedItemType } from '../../store/rawDataReducer'
import { convertStringToNumber } from '../../../utils/NumberHelper'

type CalculatorProps = {
  selectedItems: SelectedItemType
}

const Calculator = ({ selectedItems }: CalculatorProps) => {
  const getTotalPower = () => {
    return (
      convertStringToNumber(selectedItems.cpu?.power)
      + convertStringToNumber(selectedItems.cpu1?.power)
      + convertStringToNumber(selectedItems.cpu2?.power)
      + convertStringToNumber(selectedItems.cpu3?.power)
    )
  }

  const getTotalPrice = () => {
    return (
      convertStringToNumber(selectedItems.cpu?.price)
      + convertStringToNumber(selectedItems.cpu1?.price)
      + convertStringToNumber(selectedItems.cpu2?.price)
      + convertStringToNumber(selectedItems.cpu3?.price)
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography>TDP</Typography>
        <Typography>{getTotalPower()}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>Price</Typography>
        <Typography>{getTotalPrice()}</Typography>
      </Grid>
    </Grid>
  )
}

export default Calculator
