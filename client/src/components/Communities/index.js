const Communities = ({ username, communities }) => {
    if (!communities || !communities.length) {
        return <p className="bg-dark text-light p-3">{username}, join some communities!</p>;
    }

    return (
        <div>
            <h5>
                {username}'s {communities}
            </h5>
            {communities.map(community => (
                <button className="btn w-100 display-block mb-2" key={community._id}>
                    <Link to={`/profile/${community.name}`}>{community.name}</Link>
                </button>
            ))}
        </div>
    );
};

export default Communities;