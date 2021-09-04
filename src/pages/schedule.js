import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, IconButton } from '@chakra-ui/react'
import { useFetch } from '@refetty/react'
import { addDays, subDays } from 'date-fns'

import { useAuth } from '../components/Auth'
import { Logo } from '../components/Logo'
import { FormatDate } from '../components/Date'


const getSchedule = (when) => axios({
  method: 'get',
  url: '/api/schedule',
  params: { when },
  // headers: { Authorization: `Bearer ${ token }` }
})

export default function Schedule() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, { lazy: true })

  function addDay() {
    setWhen(prevState => addDays(prevState, 1))
  }

  function removeDay() {
    setWhen(prevState => subDays(prevState, 1))
  }

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  useEffect(() => {
    fetch(when)
  }, [when])

  return (
    <Container>
      <Flex as='header' p='4' align='center' justify='space-between'>
        <Box w='150px'>
          <Logo />
        </Box>
        <Button onClick={logout}>Sair</Button>
      </Flex>
      <Flex align='center' justify='space-between' mt='8'>
        <IconButton
          icon={ <ChevronLeftIcon /> }
          variant='unstyled'
          onClick={ removeDay }
        />
        <Box>{ FormatDate(when, 'PPPP') }</Box>
        <IconButton
          icon={ <ChevronRightIcon /> }
          variant='unstyled'
          onClick={ addDay }
        />
      </Flex>
    </Container>
  )
}