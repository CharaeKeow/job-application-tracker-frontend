import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../configs/firebase'

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(navigate('../'))
      .catch((error) => console.error(error))
  }

  return (
    <React.Fragment>
      <h2>Login</h2>
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
          Sign In
        </button>
      </form>
    </React.Fragment>
  )
}