import React from 'react';
import WellcomePage from './page/wellcomePage';
import SignupPage from './container/singUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<WellcomePage />} />
          
        </Routes>
        <Routes>
        <Route path="/singUp" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
