import { Box, Button, Container, Flex, FormControl } from '@chakra-ui/react'
import { FormHelperText, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Logo } from '../components/Logo'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
})

export default function Home() {
  const formik = useFormik({
    onSubmit: () => {},
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }
  })

  return (
    <Container p={ 4 } centerContent>
      <Logo />
      <Box p={ 4 } mt={ 8 }>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Stack spacing={ 8 }>
        <FormControl id='email'isRequired>
          <FormLabel color='gray.400'>E-mail</FormLabel>
          <Input
            type='email'
            borderColor='gray.400'
            value={ formik.values.email }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          { formik.touched.email && (
            <FormHelperText color='red.400' >
              { formik.errors.email }
            </FormHelperText>
          ) }
        </FormControl>
        <FormControl id='password'isRequired>
          <FormLabel color='gray.400'>Senha</FormLabel>
          <Input
            type='password'
            borderColor='gray.400'
            value={ formik.values.password }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          { formik.touched.password && (
            <FormHelperText color='red.400' >
              { formik.errors.password }
            </FormHelperText>
          ) }
        </FormControl>
        <Flex align='center'>
          <Text mr={ 1 }>cloker.work/</Text>
          <FormControl id='username' isRequired>
            <Input
              type='text'
              borderColor='gray.400'
              value={ formik.values.username }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
            />
            { formik.touched.username && (
              <FormHelperText color='red.400' >
                { formik.errors.username }
              </FormHelperText>
            ) }
          </FormControl>
        </Flex>
        <Button w='100%' colorScheme='blue'>
          Entrar
        </Button>
      </Stack>
    </Container>
  )
}