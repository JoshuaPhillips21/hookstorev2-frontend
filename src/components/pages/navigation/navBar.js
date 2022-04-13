import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import { useAppContext } from '../../context'
import Cookies from 'js-cookie'

export default function NavBar() {
  const { loggedIn, setLoggedIn, login, logout } = useAppContext()

  const buttonType = () => {
    if (Cookies.get('username')) {
      console.log('found', Cookies.get())
      setLoggedIn(false)
      logout()
    } else if (loggedIn && Cookies.get('username')) {
      console.log('not found', Cookies.get('username'))
      login()
    }
  }

  useEffect(() => {
    if (Cookies.get('username')) {
      setLoggedIn(true)
    }
  })

  return (
    <div className="navigation-container">
      <div className="nav-link-wrapper">
        <div className="nav-link">
          <A className="link" href="/">
            Home
          </A>
        </div>
        <div className="nav-link">
          <A className="link" href="/add">
            Add-Book
          </A>
        </div>
        <div className="nav-link">
          <A className="link" href="/signup">
            {loggedIn ? '' : 'Sign Up'}
          </A>
        </div>
        <div className="nav-link">
          <A className="link" href="/login" onClick={buttonType}>
            {loggedIn ? 'Logout' : 'Login'}
          </A>
        </div>
      </div>
    </div>
  )
}
