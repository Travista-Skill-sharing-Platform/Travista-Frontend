import React, { useEffect, useState } from 'react';
import { MdNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import './NavBar.css';
import './UserCard.css';

function NavBar() {
    const [allRead, setAllRead] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/notifications/${userId}`);
                const unreadNotifications = response.data.some(notification => !notification.read);
                setAllRead(!unreadNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchNotifications();
            fetchUserData(); // Fetch user data on component mount
        }
    }, [userId]);

    const currentPath = window.location.pathname;

    return (
        <div className="navbar">
            <div className='nav_con'>
                <div className='nav_item_set'>
                    <div className='logoo'></div>
                    <div className='nav_bar_item'>
                        <p className={`nav_item_z ${currentPath === '/allPost' ? 'nav_item_z_nav' : ''}`}
                            onClick={() => (window.location.href = '/allPost')}>Post</p>
                        <p className={`nav_item_z ${currentPath === '/allQuest' ? 'nav_item_z_nav' : ''}`}
                            onClick={() => (window.location.href = '/allQuest')}>Quiz</p>
                        <p className={`nav_item_z ${currentPath === '/myCommunity' ? 'nav_item_z_nav' : ''}`}
                            onClick={() => (window.location.href = '/myCommunity')}>Community</p>
                        {allRead ? (
                            <MdNotifications
                                className={`nav_item_icon ${currentPath === '/notifications' ? 'nav_item_icon_noty' : ''}`}
                                onClick={() => (window.location.href = '/notifications')} />
                        ) : (
                            <MdNotifications className='nav_item_icon_noty' onClick={() => (window.location.href = '/notifications')} />
                        )}

                        <FaUserCircle
                            className='nav_item_icon'
                            onClick={() => setShowCard(!showCard)}
                        />
                    </div>
                </div>
                {showCard && userData && (
                    <div className="user-card">
                        <p><strong>Full Name:</strong> {userData.fullname}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p style={{ display: localStorage.getItem('userType') === 'google' ? 'none' : 'block' }}><strong>Phone:</strong> {userData.phone}</p>
                        <p style={{ display: localStorage.getItem('userType') === 'google' ? 'none' : 'block' }}><strong>Bio:</strong> {userData.bio}</p>
                        <div className='user-card-actions'>
                            <p style={{ display: localStorage.getItem('userType') === 'google' ? 'none' : 'block' }} className='action_item' onClick={() => (window.location.href = `/updateUserProfile/${userId}`)}>Update Profile</p>
                            <p style={{ display: localStorage.getItem('userType') === 'google' ? 'none' : 'block' }} className='action_item' onClick={() => {
                                if (window.confirm('Are you sure you want to delete your profile?')) {
                                    axios.delete(`http://localhost:8080/user/${userId}`)
                                        .then(() => {
                                            alert('Profile deleted successfully!');
                                            localStorage.removeItem('userID');
                                            window.location.href = '/';
                                        })
                                        .catch(error => console.error('Error deleting profile:', error));
                                }
                            }}>Delete Profile</p>
                            <p className='action_item'
                                onClick={() => {
                                    localStorage.removeItem('userID');
                                    localStorage.removeItem('userType');
                                    window.location.href = '/';
                                }}>Log Out</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
