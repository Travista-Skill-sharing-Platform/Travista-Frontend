import React from 'react';

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          {/* Protected Routes */}
          
          <Route
            path="/allCommunity"
            element={
              <ProtectedRoute>
                <AllCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addNoties/:id"
            element={
              <ProtectedRoute>
                <AddNotices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/allNoties/:communityId"
            element={
              <ProtectedRoute>
                <AllNotices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communityDetails/:communityId"
            element={
              <ProtectedRoute>
                <CommunityDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communityUsers/:id"
            element={
              <ProtectedRoute>
                <AllUserForCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateNoties/:id"
            element={
              <ProtectedRoute>
                <UpdateNotices />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </React.Fragment>
      </div>
  );
}

export default App;
