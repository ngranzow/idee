import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

//CHAKRA
import {useColorMode} from '@chakra-ui/color-mode'
import {useMediaQuery} from '@chakra-ui/media-query'
import { Stack, VStack, Flex, Box, Text, Circle} from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { FaHouseUser, FaUser } from 'react-icons/fa'

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
                        <Text fontSize="4xl" fontWeight="semibold">
                            Free to 
                        </Text>

                        <Text fontSize="8xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip='text'>
                            idee 
                        </Text>

                        <Text color={isDark ? "gray.200" : "gray.500"}> The Social Media Platform for Free Speech. Share your    </Text>
                        
                        
                    </Box>

                    <Image alignSelf="center" mt={isNotSmallerScreen ? "0":"12"}
                        mb={isNotSmallerScreen ? "0" :"12"} borderRadius='full'
                        backgroundColor="transparent" boxShadow="1g"
                        boxSize="300px" src={logo} />
                    
                    <Circle position="absolute" bg="blue.100" opacity="0.1"
                w="300px" h="300px" alignSelf="flex-end" />

            </Flex>

        </Stack>
        <VStack p={5}>
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                
                <Flex w="100%">
                <Link to="/"><IconButton ml={10} size="lg" icon={<FaHouseUser />} isRound="true">
                </IconButton>
                </Link>
                <nav>
                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/youridee"><IconButton ml={10} size="lg" icon={<FaUser />} isRound="true">
                            </IconButton></Link>

                            {/* <Link to="/friendlist"><IconButton ml={10} size="lg" icon={<FaUserFriends />} isRound="true">
                            </IconButton></Link>

                            <Link to="/community/:communityName"><IconButton ml={10} size="lg" icon={<FaPeopleCarry />} isRound="true">
                            </IconButton></Link> */}

                            <a href="/" onClick={logout}><Button size="sm" ml={10} colorScheme="blue" >Log out</Button>
                            </a>
                        </>
                    ) : (
                        <>
                        <Box alignSelf='center' mt={isNotSmallerScreen ? "0" : 16} align='flex-start'>
                            <Link to="/login"><Button mt={4} size="sm" colorScheme="blue" >Log In</Button></Link>
                            <Link to="/signup"><Button mt={4} size="sm" colorScheme="blue" >Sign Up</Button></Link>
                        </Box>
                        </>
                    )}
                </nav>
                </Flex>
            </div>
            </VStack>
        </header>
    );
};

export default Header;