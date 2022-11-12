import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  CircularProgress,
  InputAdornment,
  SelectProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { addCurrencySign } from '../../../utils/NumberHelper'

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
  model: string
  brand: string
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
  // const [selectValue, setSelectValue] = useState('')
  const { t } = useTranslation()

  const handleChange = (event: any, newValue: any) => {
    if (selectChange) {
      selectChange(newValue ? newValue.model : '', label)
      // setSelectValue(newValue.model)
    }
  }

  if (options.length === 0) {
    return (
      <CustomAutocomplete
        disabled
        renderInput={(params) => (
          /* eslint-disable react/jsx-props-no-spreading */
          <TextField
            {...params}
            label={t(label)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress size={28} />
                </InputAdornment>
              ),
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
      groupBy={(option: any) => option.brand}
      onChange={handleChange}
      isOptionEqualToValue={(option: any, value: any) => option.model === value.model}
      getOptionDisabled={(option: any) => option.disabled === true}
      /* eslint-disable react/jsx-props-no-spreading */
      renderOption={(props, option: any) => (
        <Box component="li" {...props}>
          <Stack
            sx={{ width: '100%' }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography>{option.label}</Typography>
            <ValueTypography>
              {addCurrencySign(option.value)}
            </ValueTypography>
          </Stack>
        </Box>
      )}
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
