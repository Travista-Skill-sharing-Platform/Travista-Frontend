import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function AllUserForCommunity() {
  const [communityId, setCommunityId] = useState('');
  const [users, setUsers] = useState([]);
  const [communityUsers, setCommunityUsers] = useState([]); // State to store community users
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userID');

  useEffect(() => {
    const storedCommunityId = localStorage.getItem('selectedCommunityId');
    if (storedCommunityId) {
      setCommunityId(storedCommunityId);
    } else {
      alert('No community ID found in local storage!');
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/user');
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter((user) => user.id !== loggedInUserId);
          setUsers(filteredUsers);
        } else {
          alert('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [loggedInUserId]);

  useEffect(() => {
    const fetchCommunityUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}/users`);
        if (response.ok) {
          const data = await response.json();
          setCommunityUsers(data.map((user) => user.id)); // Store only user IDs
        } else {
          alert('Failed to fetch community users.');
        }
      } catch (error) {
        console.error('Error fetching community users:', error);
      }
    };
    if (communityId) {
      fetchCommunityUsers();
    }
  }, [communityId]);

  const addUserToCommunity = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/communities/${communityId}/addUser`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        alert('User added to community successfully.');
        navigate(`/communityDetails/${communityId}`);
      } else {
        alert('Failed to add user to community.');
      }
    } catch (error) {
      console.error('Error adding user to community:', error);
    }
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
