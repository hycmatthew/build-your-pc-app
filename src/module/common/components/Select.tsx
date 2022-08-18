import React from 'react'
import { SelectProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
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
  onchange?: (value: any) => void
}

const SelectElement = ({
  label,
  placeholder,
  options,
  onchange,
}: SelectElementProps) => {
  return (
    <CustomSelect label={label} onChange={onchange}>
      <MenuItem value="">{placeholder}</MenuItem>
      {options.map((item: any) => (
        <MenuItem value={item.value}>{item.label}</MenuItem>
      ))}
    </CustomSelect>
  )
}

SelectElement.defaultProps = {
  placeholder: 'select',
  onchange: () => {},
}

export default SelectElement
