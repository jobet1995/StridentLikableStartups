import React, { useEffect } from 'react'
import http from '../../http'

export default function Logout(props) {
  const { setUser, history: { push } } = props

  useEffect(() => {
    function logout() {
      http.get('/logout').finally(() => {
        localStorage.removeItem('express_token')
        login()
      })
    }
    function login() {
      setUser(null)
      push('login')
    }
    if (localStorage.getItem('express_token')) {
      logout()
    }
    else {
      login()
    }
  }, [ setUser, push ])

  return (
    <span>Logout...</span>
  )
}