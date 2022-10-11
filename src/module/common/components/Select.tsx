import i18n from 'i18next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  CircularProgress,
  FormControl,
  SelectProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { addCurrencySign } from '../../../utils/NumberHelper'

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
    if (selectChange && newValue) {
      console.log(newValue)
      selectChange(newValue.model, label)
      // setSelectValue(newValue.model)
    }
  }

  if (options.length === 0) {
    return (
      <CustomAutocomplete
        renderInput={(params) => (
          <CircularProgress
            size={24}
            sx={{
              color: '#9e9e9e',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
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
      isOptionEqualToValue={(option: any, value: any) => (
        option.model === value.model
      )}
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
            <ValueTypography>{addCurrencySign(option.value, i18n.language)}</ValueTypography>
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
