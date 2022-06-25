import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../configs/firebase'

export default function Registration() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then(navigate('../')) // navigate back to / page (Dashboard)
      .catch((error) => console.error(error))
  }

  return (
    <React.Fragment>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit">
          Sign Up
        </button>
      </form>
    </React.Fragment>
  )
}