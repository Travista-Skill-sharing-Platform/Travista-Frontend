import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';

function CreateCommunity() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Hardcoded userId for frontend use
    setUserId('1');
  }, []);

  const handleCreateCommunity = () => {
    if (!userId) {
      alert('User ID is required!');
      return;
    }

    // Simulate the community creation process
    alert('Community created successfully!');
    setName('');
    window.location.href = '/myCommunity';
  };

  return (
    <div>
      <NavBar />
      <div className='continer_full'>
        <div className='continer'>
          <div className='continSection'>
            <div className="from_continer">
              <p className="Auth_heading">Create Community</p>
              <div className='from_data'>
                <div className="Auth_formGroup">
                  <label className="Auth_label">Name</label>
                  <input
                    type="text"
                    className="Auth_input"
                    placeholder="Community Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                </div>
                <button className="Auth_button" onClick={handleCreateCommunity}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunity;
