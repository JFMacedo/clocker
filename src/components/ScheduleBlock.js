import { Box, Flex, Stack } from "@chakra-ui/react";

export function ScheduleBlock({ time, name, phone }) {
  return (
    <Flex
      align='center'
      justify='space-between'
      p='4'
      borderRadius='8'
      borderWidth='1px'
      borderColor='gray.200'
      backgroundColor='gray.100'
    >
      <Box fontSize='2xl'>{ time }</Box>
      <Stack textAlign='right'>
        <Box fontSize='xl' fontWeight='700'>{ name }</Box>
        <Box>{ phone }</Box>
      </Stack>
    </Flex>
  )
}