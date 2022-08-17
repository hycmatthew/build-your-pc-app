import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './MainPage'

function ComponentListRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  )
}

export default ComponentListRoutes
