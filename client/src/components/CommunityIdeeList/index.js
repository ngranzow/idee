import React from 'react';
import { Link } from 'react-router-dom';

const CommunityIdeeList = ({ communityIdees }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Idees</span>
      </div>
      <div className="card-body">
        {communityIdees &&
          communityIdees.map(communityIdee => (
            <p className="pill mb-3" key={communityIdee._id}>
              {communityIdee.communityIdeeText} //{' '}
              <Link to={`/youridee/${communityIdee.username}`} style={{ fontWeight: 700 }}>
                {communityIdee.username} on {communityIdee.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommunityIdeeList;