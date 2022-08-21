import React from 'react'
import SelectElement from '../../common/components/Select'

type ComponentMenuProps = {
  dataList: any[]
}

const ComponentMenu = ({ dataList }: ComponentMenuProps) => {
  const generateCPUSelectElement = () => {
    return dataList.map((item: any) => {
      return (
        <SelectElement
          label={item.name}
          options={[{ label: item.name, value: item.name }]}
        />
      )
    })
  }

  return <>{generateCPUSelectElement()}</>
}

export default ComponentMenu
