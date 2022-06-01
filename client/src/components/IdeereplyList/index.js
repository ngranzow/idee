import React from 'react';
import { Link } from 'react-router-dom';

const ReplyList = ({ replys }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Replys</span>
      </div>
      <div className="card-body">
        {replys &&
          replys.map(reply => (
            <p className="pill mb-3" key={reply._id}>
              {reply.replyBody} //{' '}
              <Link to={`/youridee/${reply.username}`} style={{ fontWeight: 700 }}>
                {reply.username} on {reply.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReplyList;
