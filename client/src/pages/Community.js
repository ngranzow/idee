import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COMMUNITY } from '../utils/queries';
import CommunityIdeeForm from '../components/CommunityIdeeForm';
import CommunityIdeeList from '../components/CommunityIdeeList';
import Auth from '../utils/auth';

//CHAKRA
import {useMediaQuery} from '@chakra-ui/media-query'
import {Flex, Text} from '@chakra-ui/layout';

const Community = (props) => {
  const { communityName: communityName } = useParams();

  //MEDIA QUERY
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  const { loading, data } = useQuery(QUERY_COMMUNITY, {
    variables: { communityName: communityName }
  });

  const community = data?.community || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Flex direction={isNotSmallerScreen ? "row": "column"}
                    spacing="200px" p={isNotSmallerScreen ? "32" : "0"}
                    alignSelf="flex-start">
      <div className="card mb-3">
        <div className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {community.communityName}
          </span>{' '}
          <Text fontSize="4xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip='text'>
          Idee on {community.createdAt}
          </Text>
        </div>
        <div className="card-body">
          <p>{community.communityIdeeText}</p>
        </div>

        <div>
          {community.communityIdees.map(idee => {
            return (
              <p key={idee._id}>
                {idee.communityIdeeText}
              </p>
            );
          })}
        </div>
      </div>
      </Flex>

      <Flex rounded="xl" direction="column" mt={2} ml={20} bg="blue.300" opacity="0.85" h="30vh" w="30vh" justify="center">
      {community.communityReplyCount > 0 && <CommunityIdeeList communityIdees={community.communityIdees} />}
      {Auth.loggedIn() && <CommunityIdeeForm communityName={community.communityName} />}
    </Flex>
    </div>
    
  );
};

export default Community;