import { Navigate, useParams } from 'react-router-dom';

import Idees from '../components/Idees';
import Communities from '../components/Communities';
import IdeeForm from '../components/IdeeForm';
import FriendList from '../components/FriendList';
import CommunityForm from '../components/CommunityForm';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

//CHAKRA UI
import React from 'react'
//import { useMediaQuery } from '@chakra-ui/media-query';
//import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
//import Icon from '@chakra-ui/icon';
//import { DiCodeigniter, DiAndroid, DiWebplatform } from 'react-icons/di'

const YourIdee = (props) => {
  //MediaQuery - Update CHAKRA
  //const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getYourIdee().data.username === userParam) {
    return <Navigate to="/youridee/:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleFriendClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (

    <div>

      <div className="flex-row mb-3 profile-container">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Welcome to {userParam ? `${user.username}'s` : 'your'} profile!
        </h2>

        {userParam && (
          <div>
            <button className="btn ml-auto" onClick={handleFriendClick}>
              Add Friend
            </button>
          </div>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3 idee-list">
        <div className="col-12 mb-3 col-lg-8 name-idee">
          <Idees idees={user.idees} title={`${user.username}'s Idees...`} />
        </div>
        <div className="col-12 col-lg-3 mb-3 friend-container">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
        <div className="col-12 col-lg-3 mb-3 communities-container">
          <Communities
            username={user.username}
            communities={user.communities}
          />
        </div>
      </div>
      <div className="mb-3 new-idee">{!userParam && <IdeeForm />}</div>
      <div className="mb-3 new-community">{!userParam && <CommunityForm />}</div>
    </div>
  );
};

export default YourIdee;