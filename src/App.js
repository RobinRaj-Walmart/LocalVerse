import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/loginPage';
import HomePage from './Components/homePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home-page" element={<HomePage />} />
        {/* You can add a redirect for the root path to automatically go to either sign-in or home-page */}
        <Route
          path="/"
          element={<SignIn />}
        />
      </Routes>
    </Router>
  );
}

export default App;
