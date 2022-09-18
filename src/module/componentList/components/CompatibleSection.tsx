import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styled from '@emotion/styled'

import { SelectedItemType } from '../../store/rawDataReducer'
import { getTotalPrice } from '../../../utils/NumberHelper'
import {
  motherboardIncompatible,
  ramIncompatible,
} from '../../../logic/incompatibleLogic'

type CompatibleSectionProps = {
  selectedItems: SelectedItemType
}

const CustomContainer = styled(Container)({
  backgroundColor: '#ffffff',
  padding: '8px',
  borderRadius: '6px',
  marginTop: '16px',
})

const CompatibleSection = ({ selectedItems }: CompatibleSectionProps) => {
  const { t, i18n } = useTranslation()

  const createSuggestion = () => {
    const motherboardMatch = motherboardIncompatible(
      selectedItems.cpu?.socket,
      selectedItems.motherboard?.socket
    )
    const ramCompatible = selectedItems.ram
      ? ramIncompatible(
        selectedItems.cpu?.brand,
        selectedItems.motherboard?.supportedRam,
        selectedItems.ram
      )
      : false

    const suggestion:String[] = []
    if (motherboardMatch) {
      suggestion.push('motherboard issue')
    }
    if (ramCompatible) {
      suggestion.push('ram issue')
    }
    return suggestion
  }

  return (
    <CustomContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography>{t('compatible-issue')}</Typography>
          {
            createSuggestion().map((item: any) => (
              <Typography>{item}</Typography>
            ))
          }
        </Grid>
      </Grid>
    </CustomContainer>
  )
}

export default CompatibleSection
