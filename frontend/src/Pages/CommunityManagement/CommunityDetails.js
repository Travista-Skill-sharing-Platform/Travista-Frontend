import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import './community.css';

function CommunityDetails() {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [users, setUsers] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [communityName, setCommunityName] = useState(''); 
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    // Hardcoded data for frontend use
    setCommunityName('Community 1');
    setOwnerId('1');
    setNotices([
      { id: 1, title: 'Notice 1', content: 'Content 1', userId: '1' },
      { id: 2, title: 'Notice 2', content: 'Content 2', userId: '2' },
    ]);
    setUsers([
      { id: '1', fullname: 'User 1' },
      { id: '2', fullname: 'User 2' },
      { id: '3', fullname: 'User 3' },
    ]);
  }, [communityId]);

  useEffect(() => {
    const userNamesMap = { '1': 'User 1', '2': 'User 2' };
    setUserNames(userNamesMap);
  }, [notices]);

  const userId = '1'; // Hardcoded logged-in user ID for frontend use

  const handleDeleteNotice = (noticeId) => {
    setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
    alert('Notice deleted successfully.');
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
                  </button>
                ) : ownerId === null ? (
                  <p>Loading community details...</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className='com_con_card_fill'>
              <div className='com_data_card'>
                <p className='names'>Notices</p>
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
