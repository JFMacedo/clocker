import firebase from '../services/firebase'

import { Button } from '@chakra-ui/react'

export function Schedule() {
  const logout = () => firebase.auth().signOut()

  return (
    <Button onClick={logout}>Sair</Button>
  )
}