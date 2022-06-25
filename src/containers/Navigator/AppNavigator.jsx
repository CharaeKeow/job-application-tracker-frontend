import React from "react"
import { Routes, Route } from "react-router-dom"

import Login from "../Login"
import Registration from "../Registration"
import Dashboard from "../Dashboard"

export default function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
    </Routes>
  )
}