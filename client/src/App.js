import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//CHAKRA
import { ChakraProvider } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { Flex, VStack, Heading, Spacer } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { FaSun, FaMoon,  FaUser, FaUserFriends } from 'react-icons/fa'

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Community from './pages/Community';
import YourIdee from './pages/YourIdee';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SingleIdee from './pages/SingleIdee'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  //CHAKRA - Light and Dark Modes
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";


  return (
    <ChakraProvider>


      <ApolloProvider client={client}>

        <Router>
          <VStack p={5}>

            <Flex w="100%">

              <Heading
                ml="8" size="md" fontWeight='semibold' color="cyan.400">idee</Heading>

              <Spacer></Spacer>

              <IconButton ml={8} icon={<FaUser />} isRound="true" onClick={<Route
                  path="/youridee"
                  element={<YourIdee />}
                />}>
              </IconButton>

              <IconButton ml={8} icon={<FaUserFriends />} isRound="true" onClick={Community}>
              </IconButton>

              <IconButton ml={4} size="sm" icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}>
              </IconButton>

            </Flex>

          </VStack> 

          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/signup"
                  element={<Signup />}
                />
                <Route
                  path="/youridee"
                  element={<YourIdee />}
                />
                <Route
                  path="/idee/:id"
                  element={<SingleIdee />}
                />
                <Route
                  path="/community/:communityName"
                  element={<Community />}
                />
                <Route
                  path="*"
                  element={<NoMatch />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </ChakraProvider>


  );
}

export default App;
