import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

//CHAKRA
import React from 'react'
import {useMediaQuery} from '@chakra-ui/media-query'
import { Box, Flex, Heading, Text, Spacer } from '@chakra-ui/layout';
import { Button} from '@chakra-ui/react'

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  //MEDIA QUERY
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <main className='flex-row justify-center mb-4'>
      
      <div className='col-12 col-md-6'>
        <div className='card'>
        <Flex direction={isNotSmallerScreen ? "row" : "column"} w="100%"
            maxWidth={{ base: "100vh", md: "130vh", lg: "130vh", xl: "130vh" }}>
        <Box alignSelf="center" px="32" py="16">
                <Heading fontWeight="extrabold" color="cyan.500" size="2xl">
                    sign up
                </Heading>
                <Spacer></Spacer>
                <Text fontSize="1xl" color="gray.400">create an idee account.</Text>
            </Box>
            <Flex direction={isNotSmallerScreen ? "row" : "column"} mt={8} >
                    <Flex rounded="xl" direction="column" mt={4} bg="blue.400" h="25vh" w="30vh" justify="flex-end">

          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <br></br>
              <button className='btn d-block w-100' type='submit'>
              <Button mt={4} size="sm" colorScheme="blue" >
                        Submit </Button>
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
                <Text color="white" p="4" fontSize="xl" fontWeight="semibold">
                            idee
                </Text>
          </Flex>
          </Flex>
          </Flex>
        </div>
      </div>
    </main>
  );
};

export default Signup;
