import Idees from '../components/Idees';
import Communities from '../components/Communities';
import IdeeForm from '../components/IdeeForm';
import FriendList from '../components/FriendList';

//CHAKRA
import React from 'react'
import {useMediaQuery} from '@chakra-ui/media-query'
import {Flex, VStack} from '@chakra-ui/layout';
// import { Button} from '@chakra-ui/react'


import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_IDEES, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_IDEES);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const idees = data?.idees || [];

  //MEDIA QUERY
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

    const loggedIn = Auth.loggedIn();

    return (
      <main>
        <Flex direction={isNotSmallerScreen ? "row" : "column"} w="100%"
            maxWidth={{ base: "100vh", md: "130vh", lg: "130vh", xl: "130vh" }}>
        <div className="flex-row justify-center">

        <VStack p={5}>
        <Flex w="100%">
          {loggedIn && (

             <Flex rounded="xl" direction="column" mt={4} ml={10} bg="blue.100" opacity="0.85" h="40vh" w="40vh" justify="center">
            <div className="col-12 mb-3 ">
              <IdeeForm />
            </div>
            </Flex>

          )}

          <Flex rounded="xl" direction="column" mt={4} ml={10} bg="blue.200" opacity="0.85" h="40vh" w="40vh" justify="center">
          <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'} idee-form1`}>

            {loading ? (
              <div>Loading...</div>
            ) : (

              <Idees
                idees={idees}
                title= "Some Feed for Idee(s)..."
              />

            )}

          </div>
          </Flex>

          {loggedIn && userData ? (
            <div>

            <Flex rounded="xl" direction="column" mt={4} ml={10} bg="blue.300" opacity="0.85" h="40vh" w="40vh" justify="center">
            <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
            </div>
            {/* </Flex>

            <Flex rounded="xl" direction="column" mt={4} ml={10} bg="blue.400" opacity="0.85" h="30vh" w="30vh" justify="center"> */}
            <div className="col-12 col-lg-3 mb-3">
              <Communities
                username={userData.me.username}
                communities={userData.me.communities}
              />
            </div>
            </Flex>

            </div>
          ) : null}
          </Flex>
        </VStack>
        </div>

        </Flex>
      </main>
    );
  };

  export default Home;