import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function UpdateNotices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/notices/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } else {
          alert('Failed to fetch notice details.');
        }
      } catch (error) {
        console.error('Error fetching notice details:', error);
      }
    };

    fetchNoticeDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/communities/notices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('Notice updated successfully.');
        navigate(-1);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update the notice.');
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Network error while updating the notice.');
    }
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
