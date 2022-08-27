import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ComponentListRoutes from './module/componentList/pages/Route'
import store from './module/store/store'

function App() {
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
