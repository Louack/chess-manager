import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Profile from './pages/Profile';
import Tournaments from './pages/Tournaments';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/tournaments" exact element={<Tournaments />} />
        <Route path="/players" exact element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
