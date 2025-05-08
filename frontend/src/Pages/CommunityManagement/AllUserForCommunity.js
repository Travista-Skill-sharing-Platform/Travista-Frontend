import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function AllUserForCommunity() {
  const [communityId, setCommunityId] = useState('');
  const [users, setUsers] = useState([]);
  const [communityUsers, setCommunityUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const loggedInUserId = '1'; // Hardcoded logged-in user ID for the frontend

  useEffect(() => {
    // Hardcoded community ID for frontend use
    setCommunityId('1');
  }, []);

  useEffect(() => {
    // Hardcoded list of users for frontend use
    setUsers([
      { id: '1', fullname: 'User 1' },
      { id: '2', fullname: 'User 2' },
      { id: '3', fullname: 'User 3' },
    ]);
    setCommunityUsers(['1']); // Assume user with ID '1' is already in the community
  }, []);

  const addUserToCommunity = (userId) => {
    alert('User added to community successfully.');
    navigate(`/communityDetails/${communityId}`);
  };

  const filteredUsers = users
    .filter((user) => !communityUsers.includes(user.id)) // Exclude users already in the community
    .filter((user) => user.fullname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='u_fill_card'>
            <div>
              <input
                className='search_input'
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className='user_card'>
                    <p>{user.fullname}</p>
                    <button className='addbtn' onClick={() => addUserToCommunity(user.id)}>+</button>
                  </div>
                ))
              ) : (
                <p>No users available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUserForCommunity;
