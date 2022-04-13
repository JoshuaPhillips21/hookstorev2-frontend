import React, { useState } from 'react'
import { useRoutes } from 'hookrouter'
import NavBar from './pages/navigation/navBar'
import routes from './pages/navigation/routes'
import '../style/main.scss'
import AppWrapper from './context'

export default function App() {
  const routeResult = useRoutes(routes)

  return (
    <AppWrapper>
      <div className="app">
        <NavBar />
        {routeResult}
      </div>
    </AppWrapper>
  )
}
