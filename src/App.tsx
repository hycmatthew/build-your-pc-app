import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ComponentListRoutes from './module/componentList/pages/Route'
import { getCPUDataList, getGPUDataList } from './module/store/rawDataReducer'
import store from './module/store/store'

function App() {
  store.dispatch(getCPUDataList())
  store.dispatch(getGPUDataList())
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
