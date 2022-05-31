import {Flex, Vstack, Heading} from '@chakra-ui/layout'
import {IconButton} from '@chakra-ui/button'
import {FaSun, FaMoon, FaHouseHeart, FaUser, FaPeopleRoof} from 'react-icons/fa'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  //Vstack - for colunmns
  //Flex - for navigation on top

  //Light and Dark Modes
  const {colorMode, toggleColorMode} = useColorMode();
  const isDark = colorMode==="dark";

  return (
    <ChakraProvider>

        <Vstack p={5}>

          <Flex w="100%">

            <Heading 
                ml="8" size="md" fontWeight='semibold' color="cyan.400">idee</Heading>

            <Spacer></Spacer>

            <IconButton ml={8} icon={<FaHouseHeart />} isRound="true" onClick={toggleColorMode}>
            </IconButton>

            <IconButton ml={8} icon={<FaUser />} isRound="true" onClick={toggleColorMode}>
            </IconButton>

            <IconButton ml={8} icon={<FaPeopleRoof />} isRound="true" onClick={toggleColorMode}>
            </IconButton>

            <IconButton ml={4} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}>
            </IconButton>   

          </Flex>   

          <Header></Header>
          <Social></Social>
          <Profile></Profile>

        </Vstack>
      
      <App />
    </ChakraProvider>
  )
}



