import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Box } from '@chakra-ui/react'

const Idees = ({ idees, title }) => {
    if (!idees.length) {
        return <h3>No Idees yet!</h3>;
    }

    return (
        <div className="visible-scrollbar"
>
            <h3>{title}</h3>
            {idees &&
                idees.map(idee => (
                    <div key={idee._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/youridee/${idee.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {idee.username}
                            </Link>{' '}
                            Idee on {idee.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/idee/${idee._id}`}>
                                <Text>{idee.ideeText}</Text>
                                <Text as= 'u' className="mb-0">
                                    Replys: {idee.replyCount} || Click to{' '}
                                    {idee.replyCount ? 'see' : 'start'} the replys!
                                </Text>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Idees;