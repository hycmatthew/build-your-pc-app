import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCPUDataList } from '../../store/rawDataReducer'
import { useAppDispatch } from '../../store/store'

import AppLayout from '../../common/AppLayout'
import ComponentMenu from '../components/ComponentMenu'

function MainPage() {
  const dispatch = useAppDispatch()
  // const cpuList = useSelector(getCPUDataList)

  const dataStatus = useSelector((state: any) => {
    return state
  })

  useEffect(() => {
    console.log('dispatch')
    if (dataStatus.cpuList.length === 0) {
      dispatch(getCPUDataList())
    }
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      <>
        <p>123123</p>
        <ComponentMenu dataList={dataStatus.cpuList} />
      </>
    </AppLayout>
  )
}

export default MainPage
