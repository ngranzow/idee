import { Link } from 'react-router-dom';

const Communities = ({ communities, title }) => {
    if (!communities.length) {
        return <h5>Create a community!</h5>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {communities &&
                communities.map(community => (
                    <div key={community._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/youridee/${community.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {community.username}
                            </Link>{' '}
                            Community created on {community.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/community/${community.communityName}`}>
                                <p>{community.communityName}</p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Communities;