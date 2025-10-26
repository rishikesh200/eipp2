import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import UserList from './components/Userlist';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* User List Page */}
          <Route path="/" element={<UserList />} />

          {/* Register Form Page */}
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
