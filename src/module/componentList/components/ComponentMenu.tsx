import React from 'react'
import SelectElement from '../../common/components/Select'

const ComponentMenu = () => {
  return (
    <>
      <SelectElement
        label="test"
        options={[{ label: 'text', value: 'text' }]}
      />
      <SelectElement
        label="test"
        options={[{ label: 'text', value: 'text' }]}
      />
    </>
  )
}

export default ComponentMenu
