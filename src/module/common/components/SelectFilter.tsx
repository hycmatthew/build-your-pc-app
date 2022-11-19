import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectProps, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'

const CustomAutocomplete = styled(Autocomplete)({
  height: '60px',
})

type SelectFiltertProps = SelectProps & {
  label: string
  placeholder?: string
  options: string[]
  selectChange?: (value: string) => void
}

const SelectFilter = ({ label, options, selectChange }: SelectFiltertProps) => {
  const { t } = useTranslation()

  const handleChange = (event: any, newValue: any) => {
    if (selectChange) {
      selectChange(newValue)
    }
  }

  return (
    <CustomAutocomplete
      disablePortal
      id={label}
      options={options}
      groupBy={(option: any) => option.brand}
      onChange={handleChange}
      /* eslint-disable react/jsx-props-no-spreading */
      renderInput={(params) => <TextField {...params} label={t(label)} />}
    />
  )
}

SelectFilter.defaultProps = {
  placeholder: 'Select',
  selectChange: () => {},
}

export default SelectFilter
