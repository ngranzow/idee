import React from 'react';
import { Link } from 'react-router-dom';

const Idees = ({ idees, title }) => {
    if (!idees.length) {
        return <h3>No Idees yet!</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {idees &&
                idees.map(idee => (
                    <div key={idee._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${idee.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {idee.username}
                            </Link>{' '}
                            idee on {idee.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/idee/${idee._id}`}>
                                <p>{idee.ideeText}</p>
                                <p className="mb-0">
                                    Reactions: {idee} || Click to{' '}
                                    {idee ? 'see' : 'start'} the discussion!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Idees;