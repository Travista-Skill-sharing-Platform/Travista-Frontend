import React, { useState } from 'react';
import './quest.css';
import NavBar from '../../Components/NavBar/NavBar';

function AddQuest() {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questionAnswerPairs: [{ question: '', answer: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...quiz.questionAnswerPairs];
    updatedPairs[index][field] = value;
    setQuiz({ ...quiz, questionAnswerPairs: updatedPairs });
  };

  const addQuestionAnswerPair = () => {
    setQuiz({
      ...quiz,
      questionAnswerPairs: [...quiz.questionAnswerPairs, { question: '', answer: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only: No network logic
  };

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='continSection'>
            <div className="from_continer">
              <p className="Auth_heading">Create Quiz</p>
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
                    <div key={index} className='q_pack_card'>
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
                    </div>
                  ))}
                </div>
                <br />
                <button type="submit" className="Auth_button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuest;
