import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  FormControl,
  InputLabel,
  SelectProps,
  Typography,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'

const CustomFormControl = styled(FormControl)({
  position: 'relative',
  width: '100%',
  background: '#fff',
  borderRadius: 3,
})

const CustomSelect = styled(Select)({
  height: '74px'
})

const ValueTypography = styled(Typography)({
  fontSize: '12px',
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#555',
  marginLeft: 'auto'
})

type SelectElementProps = SelectProps & {
  label: string
  placeholder?: string
  options: { label: any; value: any, disabled: boolean }[]
  selectChange?: (value: string, type: string) => void
  isLoading?: boolean
}

const SelectElement = ({
  isLoading,
  label,
  placeholder,
  options,
  selectChange,
}: SelectElementProps) => {
  const [selectValue, setSelectValue] = useState('')
  const { t } = useTranslation()

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (selectChange) {
      const tempValue = event.target.value as string
      selectChange(tempValue, label)
      setSelectValue(tempValue)
    }
  }

  if (isLoading) {
    return (
      <CustomFormControl disabled>
        <CustomSelect id="outlined-disabled" />
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
      </CustomFormControl>
    )
  }

  return (
    <CustomFormControl variant="filled">
      <InputLabel id="demo-simple-select-standard-label">{t(label)}</InputLabel>
      <CustomSelect
        label={t(label)}
        value={selectValue}
        onChange={handleChange}
      >
        <MenuItem key="select" value="" disabled>
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((item: any) => (
          <MenuItem key={item.label} value={item.label} disabled={item.disabled}>
            <Typography>{item.label}</Typography>
            <ValueTypography>{item.value}</ValueTypography>
          </MenuItem>
        ))}
      </CustomSelect>
    </CustomFormControl>
  )
}

SelectElement.defaultProps = {
  placeholder: 'Select',
  selectChange: () => {},
  isLoading: false,
}

export default SelectElement
