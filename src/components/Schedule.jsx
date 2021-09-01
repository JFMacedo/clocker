import firebaseClient from '../services/firebaseClient'

import { Button } from '@chakra-ui/react'

export function Schedule() {
  const logout = () => firebaseClient.auth().signOut()

  return (
    <Button onClick={logout}>Sair</Button>
  )
}