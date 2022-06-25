import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { auth } from './configs/firebase'
import AppNavigator from './containers/Navigator/AppNavigator'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  auth.onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  })

  console.log('Logged in?: ', isLoggedIn)

  return (
    <Router>
      <AppNavigator />
    </Router>
  )
}
