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
      <Box>{ time }</Box>
      <Stack>
        <Box textAlign='right'>{ name }</Box>
        <Box>{ phone }</Box>
      </Stack>
    </Flex>
  )
}