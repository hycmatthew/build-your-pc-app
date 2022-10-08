import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ComponentListRoutes from './module/componentList/pages/Route'
import DatabaseListRoutes from './module/database/page/Route'
import {
  getAIODataList,
  getAirCoolerDataList,
  getCaseDataList,
  getCPUDataList,
  getGPUDataList,
  getMotherboardDataList,
  getPSUDataList,
  getRAMDataList,
  getSSDDataList,
} from './module/store/rawDataReducer'
import store from './module/store/store'

function App() {
  store.dispatch(getCPUDataList())
  store.dispatch(getGPUDataList())
  store.dispatch(getMotherboardDataList())
  store.dispatch(getRAMDataList())
  store.dispatch(getPSUDataList())
  store.dispatch(getCaseDataList())
  store.dispatch(getAIODataList())
  store.dispatch(getSSDDataList())
  store.dispatch(getAirCoolerDataList())

  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <BrowserRouter>
          <ComponentListRoutes />
          <DatabaseListRoutes />
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
