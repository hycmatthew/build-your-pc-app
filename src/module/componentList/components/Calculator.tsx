import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styled from '@emotion/styled'

import { SelectedItemType } from '../../store/rawDataReducer'
import { convertStringToNumber } from '../../../utils/NumberHelper'
import BrowserLangDetect from '../../../utils/BrowserLangDetect'

type CalculatorProps = {
  selectedItems: SelectedItemType
}

const CustomContainer = styled(Container)({
  backgroundColor: '#ffffff',
  padding: '8px',
  borderRadius: '6px',
})

const Calculator = ({ selectedItems }: CalculatorProps) => {
  console.log(BrowserLangDetect())

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
      convertStringToNumber(selectedItems.cpu?.priceUS)
      + convertStringToNumber(selectedItems.cpu1?.priceUS)
      + convertStringToNumber(selectedItems.cpu2?.priceUS)
      + convertStringToNumber(selectedItems.cpu3?.priceUS)
    )
  }

  return (
    <CustomContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography>TDP</Typography>
          <Typography>{getTotalPower()}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>Price</Typography>
          <Typography>{getTotalPrice()}</Typography>
        </Grid>
      </Grid>
    </CustomContainer>
  )
}

export default Calculator
