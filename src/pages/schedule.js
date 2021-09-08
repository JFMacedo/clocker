import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, IconButton, Spinner, Stack } from '@chakra-ui/react'
import { useFetch } from '@refetty/react'
import { addDays, format, subDays } from 'date-fns'

import { useAuth } from '../components/Auth'
import { Logo } from '../components/Logo'
import { FormatDate } from '../components/Date'
import { getToken } from '../services/firebaseClient'
import { ScheduleBlock } from '../components/ScheduleBlock'

const getSchedule = async (when) => {
  const token = await getToken()

  return axios({
    method: 'get',
    url: '/api/schedule',
    params: { date: format(when, 'yyyyMMdd') },
    headers: { Authorization: `Bearer ${ token }` }
  })
}

export default function Schedule() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading }, fetch] = useFetch(getSchedule, { lazy: true })

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
        <Button variant='unstyled' onClick={logout}>Sair</Button>
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
      { loading && (
        <Spinner
          size='xl'
          thickness='4'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
        />
      ) }
      <Stack spacing='4' mt='8'>
        { data?.map(doc => (
          <ScheduleBlock key={ doc.time } time={ doc.time } name={ doc.name } phone={ doc.phone } />
        )) }
      </Stack>
    </Container>
  )
}