import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function AddNoties() {
    const [communityId, setCommunityId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedCommunityId = localStorage.getItem('selectedCommunityId');
        const storedUserId = localStorage.getItem('userID');
        if (storedCommunityId) {
            setCommunityId(storedCommunityId);
        } else {
            alert('No community ID found in local storage!');
        }
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            alert('No user ID found in local storage!');
        }
    }, []);

    const handleAddNotice = async () => {
        if (!communityId) {
            alert('Community ID is required!');
            return;
        }
        if (!userId) {
            alert('User ID is required!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/communities/${communityId}/notices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, userId }), // Include userId in the request body
            });

            if (response.ok) {
                alert('Notice added successfully!');
                setTitle('');
                setContent('');
                navigate(`/communityDetails/${communityId}`);
            } else if (response.status === 404) {
                alert('Community not found! Please check the community ID.');
            } else {
                alert('Failed to add notice.');
            }
        } catch (error) {
            console.error('Error adding notice:', error);
            alert('An error occurred while adding the notice.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className='continer_full'>
                <div className='continer'>
                    <div className='continSection'>
                        <div className="from_continer">
                            <p className="Auth_heading">Add Notice to Community</p>
                            <div className='from_data'>
                                <div className="Auth_formGroup">
                                    <label className="Auth_label">Title</label>
                                    <input
                                        type="text"
                                        className="Auth_input"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div  className="Auth_formGroup">
                                    <label className="Auth_label">Content</label>
                                    <textarea
                                     className="Auth_input"
                                        placeholder="Content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={5}
                                    />
                                </div>
                                <button className="Auth_button" onClick={handleAddNotice}>Add Notice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNoties;
