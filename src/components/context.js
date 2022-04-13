import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

const AppContext = createContext()

export default function AppWrapper({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    if (Cookies.get('username')) {
      setLoggedIn(false)
      Cookies.remove('username')
    }
  }

  const login = () => {
    if (Cookies.get('username')) {
      setLoggedIn(true)
    }
  }

  let sharedState = {
    loggedIn: loggedIn,
    setLoggedIn: (value) => setLoggedIn(value),
    login: () => login(),
    logout: () => logout(),
  }

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
