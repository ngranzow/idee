import { Link } from 'react-router-dom';

const Communities = ({ username, communities }) => {
    if (!communities || !communities.length) {
        return <p className="bg-dark text-light p-3">{username}, you are not in any communities!</p>;
    }

    return (
        <div>
            <h5>
                {username}'s {communities}
            </h5>
            {communities.map(community => (
                <button className="btn w-100 display-block mb-2" key={community._id}>
                    <Link to={`/community/${community.communityName}`}>{community.communityName}</Link>
                </button>
            ))}
        </div>
    );
};

export default Communities;