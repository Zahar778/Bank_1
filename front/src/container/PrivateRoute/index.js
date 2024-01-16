// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Проверка наличия сессии и других критериев для доступа к приватным страницам
  const isAuthenticated = window.session && window.session.user && window.session.user.isConfirm;

  return isAuthenticated ? element : <Navigate to="/signup-confirm" />;
};

export default PrivateRoute;
