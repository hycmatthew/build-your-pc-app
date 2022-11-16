import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AIComponentListRoutes from './module/aiComponentList/pages/Route'

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
import ENV_CONFIG from './config/config'

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
        <BrowserRouter basename={ENV_CONFIG.URL_BASENAME}>
          <ComponentListRoutes />
          <DatabaseListRoutes />
          <AIComponentListRoutes />
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
