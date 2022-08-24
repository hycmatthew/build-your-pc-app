import React from 'react'
import SelectElement from '../../common/components/Select'

type ComponentMenuProps = {
  dataList: any[]
}

const ComponentMenu = ({ dataList }: ComponentMenuProps) => {
  const generateCPUSelectElement = () => {
    return dataList.map((item: any) => {
      return { label: item.name, value: item.name }
    })
  }

  return (
    <SelectElement
      label="CPU"
      placeholder="select"
      options={generateCPUSelectElement()}
      onchange={() => {}}
    />
  )
}

export default ComponentMenu
