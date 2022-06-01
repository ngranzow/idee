import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_IDEE } from '../utils/queries';
import IdeereplyList from '../components/IdeereplyList'
import IdeereplyForm from '../components/IdeereplyForm';
import Auth from '../utils/auth';

const SingleIdee = (props) => {
  const { id: ideeId } = useParams();

  const { loading, data } = useQuery(QUERY_IDEE, {
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
          idee on {idee.createdAt}
        </p>
        <div className="card-body">
          <p>{idee.ideeText}</p>
        </div>
      </div>
      {idee.replyCount > 0 && <IdeereplyList replys={idee.replys} />}
      {Auth.loggedIn() && <IdeereplyForm ideeId={idee._id} />}
    </div>
  );
};

export default SingleIdee;
