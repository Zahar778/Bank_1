import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRoutePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.session) {
      const { user } = window.session;

      if (user.isConfirm) {
        navigate('/balance');
      } else {
        navigate('/signup-confirm');
      }
    } else {
      navigate('/singUp');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Страница авторизации</h1>
    </div>
  );
};

export default AuthRoutePage;


