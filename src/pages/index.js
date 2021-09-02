import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Spinner } from '@chakra-ui/react'

import { useAuth } from '../components/Auth'

export default function Home() {
  const [auth] = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(!auth.loading)
      auth.user ? router.push('/schedule') : router.push('/login')
  }, [auth.user])

  return (
    <Flex w='100%' h='100vh' align='center' justify='center'>
        <Spinner size='lg' />
      </Flex>
  )
}