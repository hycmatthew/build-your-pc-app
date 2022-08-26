import React, { useState } from 'react'
import { CircularProgress, FormControl, SelectProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'

const CustomSelect = styled(Select)({
  width: 300,
  borderRadius: 4,
  backgroundColor: 'aliceblue',
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
      <FormControl
        sx={{ minWidth: 300, position: 'relative', margin: 0 }}
        disabled
      >
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
      </FormControl>
    )
  }

  return (
    <CustomSelect label={label} value={selectValue} onChange={handleChange}>
      <MenuItem key="select" value="">
        {placeholder}
      </MenuItem>
      {options.map((item: any) => (
        <MenuItem key={item.value} value={item.label}>
          {item.label}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}

SelectElement.defaultProps = {
  placeholder: 'Select',
  selectChange: () => {},
  isLoading: false,
}

export default SelectElement
