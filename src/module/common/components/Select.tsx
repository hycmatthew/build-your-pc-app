import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  CircularProgress,
  FormControl,
  SelectProps,
  TextField,
  Typography,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'

const CustomFormControl = styled(FormControl)({
  position: 'relative',
  width: '100%',
  background: '#fff',
  borderRadius: 3,
})

const CustomAutocomplete = styled(Autocomplete)({
  height: '60px',
})

const ValueTypography = styled(Typography)({
  fontSize: '12px',
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#555',
  marginLeft: 'auto',
})

interface OptionType {
  label: string
  value: any
  disabled: boolean
}

type SelectElementProps = SelectProps & {
  label: string
  placeholder?: string
  options: OptionType[]
  selectChange?: (value: string, type: string) => void
  isLoading?: boolean
}

const SelectElement = ({
  isLoading,
  label,
  options,
  selectChange,
}: SelectElementProps) => {
  const [selectValue, setSelectValue] = useState('')
  const { t } = useTranslation()

  const handleChange = (event: any, newValue: any) => {
    if (selectChange && newValue) {
      console.log(newValue)
      selectChange(newValue.label, label)
      setSelectValue(newValue)
    }
  }

  if (isLoading) {
    console.log('test loading')
    return (
      <CustomAutocomplete
        id="outlined-disabled"
        renderInput={(params) => (
          <CircularProgress
            size={24}
            sx={{
              color: '#9e9e9e',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              zIndex: 1,
            }}
          />
        )}
        options={[]}
      />
    )
  }

  return (
    <CustomAutocomplete
      disablePortal
      id={label}
      options={options}
      onChange={handleChange}
      // getOptionLabel={(option: any) => option.label}
      // renderOption={(props, option: any) => <Box>{option.label}</Box>}
      /* eslint-disable react/jsx-props-no-spreading */
      renderInput={(params) => <TextField {...params} label={t(label)} />}
    />
  )
}

SelectElement.defaultProps = {
  placeholder: 'Select',
  selectChange: () => {},
  isLoading: false,
}

export default SelectElement
