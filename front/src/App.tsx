import React from 'react';
import WellcomePage from './page/wellcomePage';
import SignupPage from './container/singUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignInPage from './container/singIn';
import RecoveryPage from './container/recovery';
import Recovery_confirmPage from './container/recovery-confirm';
import AuthRoutePagse from './container/AuthRoute';
import SignupConfirmd from './container/signup-confirm';
import BalancePage from './container/balance';
import Login from './container/login';


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

        <Routes>
        <Route path="/signup-confirm" element={<SignupConfirmd />} />
        </Routes>

        <Routes>
        <Route path="/recovery" element={<RecoveryPage />} />
        </Routes>
      <Routes>
        <Route path="/recovery-confirm" element={<Recovery_confirmPage />} />
        </Routes>
      <Routes>
        <Route path="/AuthRoute" element={<AuthRoutePagse />} />
        </Routes>
              <Routes>
        <Route path="/balance" element={<BalancePage />} />
        </Routes>
              <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
