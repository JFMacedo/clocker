import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import firebaseClient, { persistenceMode } from '../services/firebaseClient'

const AuthContext = React.createContext([{}, () => {}])

export const login = async ({ email, password }) => {
  firebaseClient.auth().setPersistence(persistenceMode)

  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password)
    return firebaseClient.auth().currentUser
  } catch(error) {
    console.error('Login error:', error)
  }
}

export const logout = () => firebaseClient.auth().signOut()

export const signup = async ({ email, password, username }) => {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
    const user = await login({ email, password })
    const token = await user.getIdToken()

    const { data } = await axios({
      method: 'post',
      url: '/api/profile',
      data: { username },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    console.log(data)
  } catch(error) {
    console.error('Signup error:', error)
  }
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext)
  return [auth, { login, logout, signup }]
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={ [auth, setAuth] }>
      { children }
    </AuthContext.Provider>
  )
}