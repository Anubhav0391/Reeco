import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import { BiCart } from "react-icons/bi";


const Nav = () => {
  return (
    <Box bg={'#1E633F'} py={4}>
    <HStack  color={'white'} justifyContent={'space-between'} maxW={'1300px'} m={'auto'}>
        <HStack w={'35%'} justify={'space-between'} align={'center'}>
            <Text cursor={'pointer'} fontSize={30} fontWeight={'bold'}>Reeco</Text>
            <Text cursor={'pointer'}>Store</Text>
            <Text cursor={'pointer'}>Orders</Text>
            <Text cursor={'pointer'}>Analytics</Text>
        </HStack>
        <HStack w={'15%'} justify={'space-between'}>
            <Box cursor={'pointer'} position={'relative'} w={4} h={4} borderRadius={'50%'} bottom={2} left={9} lineHeight={4} fontSize={12} bg={'#3DCA72'} textAlign={'center'}>5</Box>
            <Text cursor={'pointer'}><BiCart fontSize={30}/></Text>
            <Text cursor={'pointer'} display={'flex'} alignItems={'center'} gap={2}>Hello, James <Box mt={1}><FaChevronDown fontSize={10}/></Box> </Text>
        </HStack>
    </HStack>
    </Box>
  )
}

export default Nav