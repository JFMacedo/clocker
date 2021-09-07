import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { Button, FormControl, FormLabel, FormHelperText, Input, Stack } from '@chakra-ui/react'
import { useFormik } from 'formik'

import { TimeBlockModal } from './TimeBlockModal'

const setSchedule = async data => axios({
  method: 'post',
  url: '/api/scheduled',
  data: {
    ...data,
    username: window.location.pathname.replace('/', '')
  }
})

export function TimeBlock({ time }) {
  const [isOpen, setIsOpen] = useState(false)

  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        await setSchedule({ ...values, when: time })
        toggle()
      } catch (error) {
        console.error(error)
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório')
    }),
    initialValues: {
      name: '',
      phone: ''
    }
  })
  
  function toggle() {
    setIsOpen(prevState => !prevState)
  } 

  return (
    <Button colorScheme='blue' py='8' fontSize='xl' onClick={ toggle }>
      { time }
      <TimeBlockModal
        isOpen={ isOpen }
        onClose={ toggle }
        onComplete={ formik.handleSubmit }
        isSubmitting={ formik.isSubmitting }
      >
        <form>
          <Stack spacing={ 8 } w='100%'>
            <FormControl id='name' isRequired>
              <FormLabel color='gray.400'>Nome</FormLabel>
              <Input
                size='lg'
                type='text'
                borderColor='gray.400'
                value={ formik.values.name }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                disabled={ formik.isSubmitting }
              />
              { formik.touched.name && (
                <FormHelperText color='red.400' >
                  { formik.errors.name }
                </FormHelperText>
              ) }
            </FormControl>
            <FormControl id='phone' isRequired>
              <FormLabel color='gray.400'>Telefone</FormLabel>
              <Input
                size='lg'
                type='number'
                borderColor='gray.400'
                placeholder='(99) 9 9999-9999'
                value={ formik.values.phone }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                disabled={ formik.isSubmitting }
              />
              { formik.touched.phone && (
                <FormHelperText color='red.400' >
                  { formik.errors.phone }
                </FormHelperText>
              ) }
            </FormControl>
          </Stack>
        </form>
      </TimeBlockModal>
    </Button>
  )
}