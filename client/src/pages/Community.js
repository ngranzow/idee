import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COMMUNITY } from '../utils/queries';
import CommunityIdeeForm from '../components/CommunityIdeeForm';
import CommunityIdeeList from '../components/CommunityIdeeList';
import Auth from '../utils/auth';

const Community = (props) => {
  const { communityName: communityName } = useParams();

  const { loading, data } = useQuery(QUERY_COMMUNITY, {
    variables: { communityName: communityName }
  });

  const community = data?.community || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {community.communityName}
          </span>{' '}
          Idee on {community.createdAt}
        </p>
        <div className="card-body">
          <p>{community.communityIdees}</p>
        </div>
      </div>
      {community.communityReplyCount > 0 && <CommunityIdeeList communityIdeeText={communityIdeeText} />}
      {Auth.loggedIn() && <CommunityIdeeForm communityName={community.communityName} />}
    </div>
  );
};

export default Community;