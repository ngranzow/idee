import {Flex, Vstack, Heading} from '@chakra-ui/layout'
import {IconButton} from '@chakra-ui/button'
import {FaSun, FaMoon, FaInstagram, FaGithub, FaLinkedIn} from 'react-icons/fa'

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

          </Flex>

          <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}>
          </IconButton>

        </Vstack>
      
      <App />
    </ChakraProvider>
  )
}



