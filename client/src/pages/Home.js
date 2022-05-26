import Idees from '../components/Idees';
import Communities from '../components/Communities';
import IdeeForm from '../components/IdeeForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_IDEES, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_IDEES);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const idees = data?.thoughts || [];
  
    const loggedIn = Auth.loggedIn();
  
    return (
      <main>
        <div className="flex-row justify-space-between">
          {loggedIn && (
            <div className="col-12 mb-3">
              <IdeeForm />
            </div>
          )}
          <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Idees
                idees={idees}
                title="Some Feed for Idee(s)..."
              />
            )}
          </div>
          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <Communities
                username={userData.me.username}
                communities={userData.me.communities}
              />
            </div>
          ) : null}
        </div>
      </main>
    );
  };
  
  export default Home;