import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ComponentListRoutes from './module/componentList/pages/Route'
import {
  getAIODataList,
  getCaseDataList,
  getCPUDataList,
  getGPUDataList,
  getMotherboardDataList,
  getPSUDataList,
  getRAMDataList,
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

  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <BrowserRouter>
          <ComponentListRoutes />
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
