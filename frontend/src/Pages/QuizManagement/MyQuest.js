import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";
import NavBar from '../../Components/NavBar/NavBar';
function MyQuest() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const userID = localStorage.getItem('userID');

useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/quizzes');
                const data = await response.json();
                const userQuizzes = data.filter((quiz) => quiz.userID === userID);
                setQuizzes(userQuizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, [userID]);

    const deleteQuiz = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/quizzes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Quiz deleted successfully!');
                setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
            } else {
                alert('Failed to delete quiz.');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };


 return (
        <div>
            <NavBar />
            <div className='continer_full'>
                <div className='continer'>
                    <div className='create_post' onClick={() => (window.location.href = '/addQuest')}>
                        <IoIosCreate />
                    </div>
                    <div className='quiz_concard'>
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <div key={quiz.id} className="quiz_card">
                                    <h3 className='qiz_tit'>{quiz.title}</h3>
                                    <p className='qiz_dis'>{quiz.description}</p>
                                    <label className="Auth_label_main">Questions and Answers</label>

                                    <div className='withset'>
                                        {(quiz.questionAnswerPairs || []).map((pair, index) => (
                                            <div key={index} className='q_Cardd'>
                                                <p className='quiz_main'>
                                                    <strong>{index + 1}.</strong> {pair.question}
                                                </p>
                                                <p className='ansmain'><strong>--</strong> {pair.answer}</p>

                                            </div>
                                        ))}
                                    </div>
                                    <div className='action_con_Card_q'>
                                        <button className='dltbn' onClick={() => deleteQuiz(quiz.id)}>Delete </button>
                                        <button className='upbtn' onClick={() => navigate(`/updateQuest/${quiz.id}`)}>Update</button>
                                    </div>
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

export default MyQuest;
