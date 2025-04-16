import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import './community.css'
function CommunityDetails() {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [users, setUsers] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [communityName, setCommunityName] = useState(''); // Added state for community name
  const [userNames, setUserNames] = useState({}); // State to store user names

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}/notices`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        } else {
          alert('Failed to fetch notices.');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices();
  }, [communityId]);

  useEffect(() => {
    const fetchCommunityUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          alert('Failed to fetch community users.');
        }
      } catch (error) {
        console.error('Error fetching community users:', error);
      }
    };
    fetchCommunityUsers();
  }, [communityId]);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Community Details:', data);
          if (data.ownerId !== undefined) {
            setOwnerId(data.ownerId);
          } else {
            console.error('Owner ID is missing in the response:', data);
          }
          if (data.name) {
            setCommunityName(data.name);
          } else {
            console.error('Community name is missing in the response:', data);
          }
        } else {
          console.error('Failed to fetch community details. Status:', response.status);
          alert('Failed to fetch community details.');
        }
      } catch (error) {
        console.error('Error fetching community details:', error);
      }
    };
    fetchCommunityDetails();
  }, [communityId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const uniqueUserIds = [...new Set(notices.map((notice) => notice.userId))];
      const userNamesMap = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await fetch(`http://localhost:8080/user/${userId}`);
          if (response.ok) {
            const user = await response.json();
            userNamesMap[userId] = user.fullname;
          } else {
            console.error(`Failed to fetch user with ID: ${userId}`);
          }
        } catch (error) {
          console.error(`Error fetching user with ID: ${userId}`, error);
        }
      }

      setUserNames(userNamesMap);
    };

    if (notices.length > 0) {
      fetchUserNames();
    }
  }, [notices]);

  const userId = localStorage.getItem('userID');

  const handleDeleteNotice = async (noticeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/communities/${communityId}/notices/${noticeId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
        alert("Notice deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete the notice.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Network error while deleting the notice.");
    }
  };


  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='com_fill_card'>
            <div className='com_card_hed'>
              <p className='com_name'>{communityName || 'Loading...'}</p>

              <div className='com_btn'>
                <button
                  className='upbtn'
                  onClick={() => {
                    localStorage.setItem('selectedCommunityId', communityId);
                    navigate(`/addNoties/${communityId}`);
                  }}
                >
                  Add Notice
                </button>
                {userId && ownerId && userId === ownerId ? (
                  <button

                    className='upbtn'
                    onClick={() => {
                      localStorage.setItem('selectedCommunityId', communityId);
                      navigate(`/communityUsers/${communityId}`);
                    }}
                  >
                    Add Users
                  </button>) : ownerId === null ? (
                    <p>Loading community details...</p>
                  ) : (
                  <p></p>
                )}
              </div>

            </div>
            <div className='com_con_card_fill'>
              <div className='com_data_card'>
                <p className='names'>Notice</p>
                <div className='com_data_card_in'>
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <div key={notice.id} className="notice_card">
                        <h4 className='tit_not'>{notice.title}</h4>
                        <p className='tit_per'>{notice.content}</p>
                        <p className='tit_user'>Posted by: {userNames[notice.userId] || 'Loading...'}</p>
                        {userId && notice.userId && userId === notice.userId && (
                          <div className='action_con_Card_q'>
                            <button className='dltbn' onClick={() => handleDeleteNotice(notice.id)}>Delete</button>
                            <button className='upbtn' onClick={() => navigate(`/updateNoties/${notice.id}`)}>Update</button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No notices available.</p>
                  )}
                </div>
              </div>
              <div className='com_data_card'>
                <p className='names'>Users</p>
                {users.length > 0 ? (
                  users.map((user) => (
                    <div className='user_card' key={user.id} >
                      <p>{user.fullname}</p>
                    </div>
                  ))
                ) : (
                  <p>No users in this community.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetails;
