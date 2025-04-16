import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar'
import { IoIosCreate } from "react-icons/io";
function MyCommunity() {
    const [communities, setCommunities] = useState([]);
    const userId = localStorage.getItem('userID');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMyCommunities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/communities/myCommunities/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCommunities(data);
                } else {
                    alert('Failed to fetch communities.');
                }
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };

        fetchMyCommunities();
    }, [userId]);

    const handleLeaveCommunity = async (communityId) => {
        const confirmLeave = window.confirm("Are you sure you want to leave this community?");
        if (!confirmLeave) return;

        try {
            const response = await fetch(`http://localhost:8080/communities/${communityId}/removeUser`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                setCommunities((prevCommunities) =>
                    prevCommunities.filter((community) => community.id !== communityId)
                );
                alert("You have left the community successfully.");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to leave the community.");
            }
        } catch (error) {
            console.error("Error leaving community:", error);
            alert("Network error while leaving the community.");
        }
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
                                        <button className='upbtn' onClick={() => navigate(`/communityDetails/${community.id}`)}>View </button>
                                        <button className='dltbn' onClick={() => handleLeaveCommunity(community.id)}>Leave</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='not_found_box'>
                                <div className='not_found_img'></div>
                                <p className='not_found_msg'>No Community found. Please create a new Quest.</p>
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
