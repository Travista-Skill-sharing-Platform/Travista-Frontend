import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AllNotices() {
  const { communityId } = useParams();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Hardcoded notices data for frontend use
    setNotices([
      { id: 1, title: 'Notice 1', content: 'Content 1' },
      { id: 2, title: 'Notice 2', content: 'Content 2' },
    ]);
  }, [communityId]);

  return (
    <div>
      <h2>Notices for Community {communityId}</h2>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </div>
        ))
      ) : (
        <p>No notices available.</p>
      )}
    </div>
  );
}

export default AllNotices;
