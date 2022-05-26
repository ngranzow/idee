import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_IDEES } from '../utils/queries';
import Idees from '../components/Idees';
import IdeeForm from '../components/IdeeForm';
import Auth from '../utils/auth';

const SingleThought = (props) => {
  const { id: ideeId } = useParams();

  const { loading, data } = useQuery(QUERY_IDEES, {
    variables: { id: ideeId }
  });

  const idee = data?.idee || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {idee.username}
          </span>{' '}
          Idee on {idee.createdAt}
        </p>
        <div className="card-body">
          <p>{idee.ideeText}</p>
        </div>
      </div>
      {idee.reactionCount > 0 && <Idees idee={idee} />}
      {Auth.loggedIn() && <IdeeForm ideeId={idee._id} />}
    </div>
  );
};

export default SingleThought;