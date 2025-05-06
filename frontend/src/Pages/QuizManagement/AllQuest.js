import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar'
import { IoIosCreate } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";
function AllQuest() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    return (
            <div >
                <NavBar />
                <div className='continer_full'>
                    <div className='continer'>
                        <div className='create_post' onClick={() => (window.location.href = '/addQuest')}>
                            <IoIosCreate />
                        </div>
                        <div className='create_post2' onClick={() => (window.location.href = '/myQuest')}>
                            <PiUserFocusFill />
                        </div>
                        <div className='quiz_concard'>
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz) => (
                                    <div key={quiz.id} className="quiz_card">
                                        <h3 className='qiz_tit'>{quiz.title}</h3>
                                        <p className='qiz_dis'>{quiz.description}</p>
                                        <button className='quz_btn' onClick={() => navigate(`/attemptQuest/${quiz.id}`)}>Attempt Quiz</button>
                                    </div>
                                ))
                            ) : (
                                <div className='not_found_box'>
                                    <div className='not_found_img'></div>
                                    <p className='not_found_msg'>No Quest found. Please create a new Quest.</p>
                                    <button className='not_found_btn' onClick={() => (window.location.href = '/addQuest')}>Create Quest</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default AllQuest;