import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

//LINKS
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';

//CHAKRA
import {useColorMode} from '@chakra-ui/color-mode'
import {useMediaQuery} from '@chakra-ui/media-query'
import { Stack, Flex, Box, Text, Spacer} from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react'

import logo from '../../Images/logo.png';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const [isNotSmallerScreen] =useMediaQuery("(min-width:600px)");

    return (
        
        <header className="bg-secondary mb-4 py-2 flex-row align-center">

            <Stack> 
            

            <Flex direction={isNotSmallerScreen ? "row": "column"}
                    spacing="200px" p={isNotSmallerScreen ? "32" : "0"}
                    alignSelf="flex-start">
                    
                    <Box alignSelf='center' mt={isNotSmallerScreen ? "0" : 16} align='flex-start'>
                        <Text fontSize="4xl" FontWeight="semibold">
                            Free to 
                        </Text>

                        <Text fontSize="8xl" FontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip='text'>
                            idee 
                        </Text>

                        <Text color={isDark ? "gray.200" : "gray.500"}> The Social Media Platform for Free Speech. Share your    </Text>

                        
                        <Button mt={4} size="lg" colorScheme="blue" OnClick={Login}>Log In</Button>
                        <Spacer></Spacer>
                        <Button mt={4} size="lg" colorScheme="blue" OnClick={Signup}>Sign Up</Button>
                        
                    </Box>

                    <Image alignSelf="center" mt={isNotSmallerScreen ? "0":"12"}
                        mb={isNotSmallerScreen ? "0" :"12"} borderRadius='full'
                        backgroundColor="transparent" boxShadow="1g"
                        boxSize="300px" src={logo} />

            </Flex>

        </Stack>

            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <Link to="/">
                    <h1>Idee</h1>
                </Link>
                <h2>Let us know what your idee is!</h2>
                <nav>
                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/youridee">My Idees</Link>
                             |<div></div>
                            <a href="/" onClick={logout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <></>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;