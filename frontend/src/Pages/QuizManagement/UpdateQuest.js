import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './quest.css';
import NavBar from '../../Components/NavBar/NavBar';
function UpdateQuest() {
  const { id } = useParams(); // Get quiz ID from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questionAnswerPairs: [{ question: '', answer: '' }],
  });
return (
    <div >
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='continSection'>
            <div className="from_continer">
              <p className="Auth_heading">Update Quiz</p>
              <form onSubmit={handleSubmit} className='from_data'>
                <div className="Auth_formGroup">
                  <label className="Auth_label">Title</label>
                  <input
                    type="text"
                    className="Auth_input"
                    name="title"
                    placeholder="Quiz Title"
                    value={quiz.title}
                    onChange={handleChange}
                    required

                  />
                </div>
                <div className="Auth_formGroup">
                  <label className="Auth_label">Description</label>
                  <textarea
                    className="Auth_input"
                    name="description"
                    placeholder="Quiz Description"
                    value={quiz.description}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
                <div className='flzone'>
                  <label className="Auth_label_main">Questions and Answers</label>
                  <button type="button" className="Add_button" onClick={addQuestionAnswerPair}>
                    +
                  </button>
                </div>
                <div className='q_pack_card_main'>
                  {quiz.questionAnswerPairs.map((pair, index) => (
                    <div key={index} className="q_pack_card">
                      <div className="Auth_formGroup">
                        <label className="Auth_label">Question</label>
                        <input
                          type="text"
                          className="Auth_input"
                          placeholder={`Question ${index + 1}`}
                          value={pair.question}
                          onChange={(e) => handlePairChange(index, 'question', e.target.value)}
                          required
                        />
                      </div>
                      <div className="Auth_formGroup">
                        <label className="Auth_label">Answer</label>
                        <input
                          type="text"
                          className="Auth_input"
                          placeholder={`Answer ${index + 1}`}
                          value={pair.answer}
                          onChange={(e) => handlePairChange(index, 'answer', e.target.value)}
                          required
                        />
                      </div>
                      <button type="button" className='dltbn_new' onClick={() => removeQuestionAnswerPair(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <br/>
                <button type="submit" className="Auth_button">Update Quiz</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateQuest;