import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, IconButton, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useFetch } from '@refetty/react'
import { addDays, format, subDays } from 'date-fns'

import { useAuth } from '../components/Auth'
import { Logo } from '../components/Logo'
import { FormatDate } from '../components/Date'
import { TimeBlock } from '../components/TimeBlock'

const getScheduled = async ({ when, username }) => axios({
  method: 'get',
  url: '/api/scheduled',
  params: {
    date: format(when, 'yyyyMMdd'),
    username
  }
})

export default function Schedule() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading, status, error }, fetch] = useFetch(getScheduled, { lazy: true })

  function addDay() { setWhen(prevState => addDays(prevState, 1)) }
  function removeDay() { setWhen(prevState => subDays(prevState, 1)) }

  useEffect(() => {
    fetch({ when, username: router.query.username })
  },[when, router.query.username])

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
      <SimpleGrid p='4' columns='2' spacing='4'>
        { loading && (
          <Spinner
            size='xl'
            thickness='4'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
          />
        ) }
        { data?.map(({ time, isBlocked }) => (
          <TimeBlock key={ time } time={ time } date={ when } isBlocked={ isBlocked } />
        )) }
      </SimpleGrid>
    </Container>
  )
}