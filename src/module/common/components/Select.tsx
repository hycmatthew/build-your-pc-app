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
  minWidth: 420,
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
  color: '#555'
})

type SelectElementProps = SelectProps & {
  label: string
  placeholder?: string
  options: { label: any; value: any }[]
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
      console.log(tempValue)
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
          <MenuItem key={item.label} value={item.label}>
            <Typography width={340}>{item.label}</Typography>
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
