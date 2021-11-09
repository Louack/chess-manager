import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Players from './pages/Players';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Tournaments from './pages/Tournaments';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Registration /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/tournaments" element={<PrivateRoute><Tournaments /></PrivateRoute>} />
        <Route path="/players" element={<PrivateRoute><Players /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
