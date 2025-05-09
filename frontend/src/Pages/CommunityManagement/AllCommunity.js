import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar'
import { IoIosCreate } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";
function AllCommunity() {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:8080/communities');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Handle both possible response formats
        setCommunities(data.communities || data || []);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };
    fetchCommunities();
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