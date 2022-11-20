import React, { Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { BrowserRouter, HashRouter } from 'react-router-dom'
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

function App() {
  const TRACKING_ID = 'G-P2H9P3ZY0Z'
  ReactGA.initialize(TRACKING_ID)

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
        <HashRouter>
          <ComponentListRoutes />
          <DatabaseListRoutes />
          <AIComponentListRoutes />
        </HashRouter>
      </Provider>
    </Suspense>
  )
}

export default App
