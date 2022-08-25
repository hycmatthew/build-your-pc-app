import React from 'react'
import { SelectProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { StringMappingType } from 'typescript'

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
}

const SelectElement = ({
  label,
  placeholder,
  options,
  selectChange,
}: SelectElementProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (selectChange) {
      selectChange(event.target.value as string, label)
    }
  }

  return (
    <CustomSelect label={label} onChange={handleChange}>
      <MenuItem value="">{placeholder}</MenuItem>
      {options.map((item: any) => (
        <MenuItem key={item.name} value={item.name}>
          {item.label}
        </MenuItem>
      ))}
    </CustomSelect>
  )
}

SelectElement.defaultProps = {
  placeholder: 'select',
  selectChange: () => {},
}

export default SelectElement
