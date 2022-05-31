import React from 'react'

import {useColorMode} from '@chakra-ui/color-mode'
import {useMediaQuery} from '@chakra-ui/media-query'
import { Circle, Stack, Flex, Box, Text, Button} from '@chakra-ui/layout';

//Stack is for layer in background

function Header () {

    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const [isNotSmallerScreen] =useMediaQuery("(min-width:600px)");

    return (
        <Stack> 
            <Circle position="absolute" bg="blue.100" opacity="0.1" w="300px" h="300px" alignSelf="flex-end"></Circle>

            <Flex direction={isNotSmallerScreen ? "row": "column"}
                    spacing="200px" p={isNotSmallerScreen ? "32" : "0"}
                    alignSelf="flex-start">
                    
                    <Box mt={isNotSmallerScreen ? "0" : 16} align='flex-start'>
                        <Text fontSize="4xl" FontWeight="semibold">
                            Free to 
                        </Text>

                        <Text fontSize="8xl" FontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip='text'>
                            Idee 
                        </Text>

                        <Text color={isDark ? "gray.200" : "gray.500"}> The Social Media Platform for Free Speech. Share your Idee.</Text>

                        <Button mt={8} colorScheme="blue" OnClick='../../pages/Login'>Log In</Button>
                    
                        <Button mt={8} colorScheme="blue" OnClick='../../pages/Login'>Sign Up</Button>
                    </Box>

                    <Image alignSelf="center" mt={isNotSmallerScreen ? "0":"12"}
                        mb={isNotSmallerScreen ? "0" :"12"} borderRadius='full'
                        backgroundColor="transparent" boxShadow="1g"
                        boxSize="300px" src="../../../../public/images/logo.png" />

            </Flex>

        </Stack>
    )
}

export default Header