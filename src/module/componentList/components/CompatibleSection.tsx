import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styled from '@emotion/styled'

import { SelectedItemType } from '../../store/rawDataReducer'
import {
  getTotalPower,
  stringToNumber,
} from '../../../utils/NumberHelper'
import {
  motherboardIncompatible,
  psuIncompatible,
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

type SuggestionType = {
  name: string
  type: string
}

const CompatibleSection = ({ selectedItems }: CompatibleSectionProps) => {
  const { t } = useTranslation()

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

    const psuCompatible = psuIncompatible(
      getTotalPower(selectedItems),
      stringToNumber(selectedItems.psu?.watt)
    )

    const suggestion: SuggestionType[] = []
    if (motherboardMatch) {
      suggestion.push({
        name: 'motherboard-incompatible-warning',
        type: 'warning',
      })
    }
    if (ramCompatible) {
      suggestion.push({ name: 'ram-incompatible-warning', type: 'warning' })
    }
    if (psuCompatible) {
      suggestion.push({
        name: 'motherboard-incompatible-warning',
        type: 'warning',
      })
    }
    return suggestion
  }

  return (
    <CustomContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography className="normal-header-typography">
            {t('suggestion')}
          </Typography>
          {createSuggestion().map((item: SuggestionType) => (
            <Typography>{t(item.name)}</Typography>
          ))}
        </Grid>
      </Grid>
    </CustomContainer>
  )
}

export default CompatibleSection
