import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar'
import { IoIosCreate } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";

function AllCommunity() {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hardcoded communities data for frontend use
    setCommunities([
      { id: 1, name: 'Community 1' },
      { id: 2, name: 'Community 2' },
      { id: 3, name: 'Community 3' },
    ]);
  }, []);

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='create_post' onClick={() => (window.location.href = '/createCommunity')}>
            <IoIosCreate />
          </div>
          <div className='create_post2' onClick={() => (window.location.href = '/myCommunity')}>
            <PiUserFocusFill />
          </div>
          {communities.length > 0 ? (
            communities.map((community) => (
              <div key={community.id} className="community-card">
                <h3>{community.name}</h3>
                <button onClick={() => navigate(`/communityDetails/${community.id}`)}>
                  View Community
                </button>
              </div>
            ))
          ) : (
            <p>No communities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCommunity;
