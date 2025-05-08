import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function UpdateNotices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Hardcoded notice details for frontend use
    setTitle('Sample Notice Title');
    setContent('This is the content of the sample notice.');
  }, [id]);

  const handleUpdate = () => {
    alert('Notice updated successfully.');
    navigate(-1);
  };

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='continSection'>
            <div className="from_continer">
              <p className="Auth_heading">Update Notice</p>
              <form className='from_data'
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="Auth_formGroup">
                  <label className="Auth_label">Title</label>
                  <input
                    className="Auth_input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="Auth_formGroup">
                  <label className="Auth_label">Content</label>
                  <textarea
                    className="Auth_input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                  />
                </div>
                <button className="Auth_button" type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotices;
