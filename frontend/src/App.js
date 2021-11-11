import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Players from './pages/Players';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import TournamentsList from './pages/TournamentsList';
import TournamentDetail from './pages/TournamentDetail';
import RoundsList from './pages/RoundsList'
import RoundDetail from './pages/RoundDetail'
import MatchesList from './pages/MatchesList'
import MatchDetail from './pages/MatchDetail'
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Registration /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/players" element={<PrivateRoute><Players /></PrivateRoute>} />
          <Route path="/tournaments" element={<PrivateRoute><TournamentsList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID" element={<PrivateRoute><TournamentDetail /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds" element={<PrivateRoute><RoundsList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID" element={<PrivateRoute><RoundDetail /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID/matches" element={<PrivateRoute><MatchesList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID/matches/:matchID" element={<PrivateRoute><MatchDetail /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
