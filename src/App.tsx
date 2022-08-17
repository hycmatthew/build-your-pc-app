import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ComponentListRoutes from './module/componentList/pages/Route'

function App() {
  return (
    <BrowserRouter>
      <ComponentListRoutes />
    </BrowserRouter>
  )
}

export default App
