import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styled from '@emotion/styled'

import { SelectedItemType } from '../../store/rawDataReducer'
import { getTotalPrice } from '../../../utils/NumberHelper'

type CalculatorProps = {
  selectedItems: SelectedItemType
}

const CustomContainer = styled(Container)({
  backgroundColor: '#ffffff',
  padding: '8px',
  borderRadius: '6px',
  marginTop: '16px',
})

const Calculator = ({ selectedItems }: CalculatorProps) => {
  const { t, i18n } = useTranslation()

  const totalPrice = () => {
    switch (i18n.language) {
      case 'zh-CN':
        return getTotalPrice(
          [
            selectedItems.cpu?.priceCN,
            selectedItems.gpu?.priceCN,
            selectedItems.motherboard?.priceCN,
          ],
          i18n.language
        )
      case 'zh-TW':
        return getTotalPrice(
          [
            selectedItems.cpu?.priceHK,
            selectedItems.gpu?.priceHK,
            selectedItems.motherboard?.priceHK,
          ],
          i18n.language
        )
      default:
        return getTotalPrice(
          [
            selectedItems.cpu?.priceUS,
            selectedItems.gpu?.priceUS,
            selectedItems.motherboard?.priceUS,
          ],
          i18n.language
        )
    }
  }

  return (
    <CustomContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography className="normal-header-typography">{t('price')}</Typography>
          <Typography>{totalPrice()}</Typography>
        </Grid>
      </Grid>
    </CustomContainer>
  )
}

export default Calculator
