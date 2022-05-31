import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//CHAKRA
import {Flex, Vstack, Heading} from '@chakra-ui/layout'
import {IconButton} from '@chakra-ui/button'
import {FaSun, FaMoon, FaHouseUser, FaUser, FaUserFriends} from 'react-icons/fa'

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
   const {colorMode, toggleColorMode} = useColorMode();
   const isDark = colorMode==="dark";
 

  return (
    
    <ApolloProvider client={client}>

        <ChakraProvider>
        <Vstack p={5}>

          <Flex w="100%">

            <Heading 
                ml="8" size="md" fontWeight='semibold' color="cyan.400">idee</Heading>

            <Spacer></Spacer>

            <IconButton ml={8} icon={<FaHouseUser />} isRound="true" onClick={toggleColorMode}>
            </IconButton>

            <IconButton ml={8} icon={<FaUser />} isRound="true" onClick={toggleColorMode}>
            </IconButton>

            <IconButton ml={8} icon={<FaUserFriends />} isRound="true" onClick={toggleColorMode}>
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

      <Router>
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
                path="/idee:id"
                element={<SingleIdee />}
              />
              <Route
                path="/community"
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

    
  );
}

export default App;
