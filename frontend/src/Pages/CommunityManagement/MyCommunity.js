import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import { IoIosCreate } from "react-icons/io";

function MyCommunity() {
  const [communities, setCommunities] = useState([]);
  const userId = '1'; // Hardcoded logged-in user ID for frontend use
  const navigate = useNavigate();

  useEffect(() => {
    // Hardcoded communities data for frontend use
    setCommunities([
      { id: '1', name: 'Community 1' },
      { id: '2', name: 'Community 2' },
      { id: '3', name: 'Community 3' },
    ]);
  }, [userId]);

  const handleLeaveCommunity = (communityId) => {
    const confirmLeave = window.confirm("Are you sure you want to leave this community?");
    if (!confirmLeave) return;

    // Simulate the leaving process by filtering out the community from the list
    setCommunities((prevCommunities) =>
      prevCommunities.filter((community) => community.id !== communityId)
    );
    alert("You have left the community successfully.");
  };

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='create_post' onClick={() => (window.location.href = '/createCommunity')}>
            <IoIosCreate />
          </div>
          <div className='quiz_concard'>
            {communities.length > 0 ? (
              communities.map((community) => (
                <div key={community.id} className="quiz_card">
                  <h3 className='qiz_tit'>{community.name}</h3>
                  <div className='action_con_Card_q'>
                    <button className='upbtn' onClick={() => navigate(`/communityDetails/${community.id}`)}>View</button>
                    <button className='dltbn' onClick={() => handleLeaveCommunity(community.id)}>Leave</button>
                  </div>
                </div>
              ))
            ) : (
              <div className='not_found_box'>
                <div className='not_found_img'></div>
                <p className='not_found_msg'>No Community found. Please create a new Community.</p>
                <button className='not_found_btn' onClick={() => (window.location.href = '/createCommunity')}>Create Community</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCommunity;
