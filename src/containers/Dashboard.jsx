import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../configs/firebase'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  auth.onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  })

  const signOut = () => {
    auth.signOut()
  }

  const handleLogin = () => navigate('../login')

  const handleRegister = () => navigate('../register')

  return (
    <>
      {
        isLoggedIn ? (
          <>
            <button onClick={signOut}>
              Sign Out
            </button>
          </>
        ) : (
          <div>
            <button onClick={handleLogin}>Sign In</button>
            <button onClick={handleRegister}>Sign Up</button>
          </div>
        )
      }
    </>
  )
}