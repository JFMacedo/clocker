import firebase from '../services/firebase'
import { useEffect, useState } from 'react'

import { Login } from '../components/Login'
import { Schedule } from '../components/Schedule'
import { Flex, Spinner } from '@chakra-ui/react'

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if(auth.loading) {
    return (
      <Flex w='100%' h='100vh' align='center' justify='center'>
        <Spinner size='lg' />
      </Flex>
    )
  }

  return auth.user ? <Schedule /> : <Login />
}