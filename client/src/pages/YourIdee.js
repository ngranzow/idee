import { Navigate, useParams } from 'react-router-dom';

import Idees from '../components/Idees';
import Communities from '../components/Communities';
import IdeeForm from '../components/IdeeForm';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMUNITY } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const YourIdee = (props) => {
  const { username: userParam } = useParams();
  const [addCommunity] = useMutation(ADD_COMMUNITY);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/youridee:username" />;
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

  const handleClick = async () => {
    try {
      await addCommunity({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Community
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <Idees thoughts={user.idee} title={`${user.username}'s Idees...`} />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <Communities
            username={user.username}
            communities={user.communities}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <IdeeForm />}</div>
    </div>
  );
};

export default YourIdee;