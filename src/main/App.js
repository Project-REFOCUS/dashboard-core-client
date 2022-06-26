import React from 'react';

import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';


const App = () => (
    <div>
        <Header />
        <h1>Project Refocus</h1>
        <Toolbar />
        <Navbar />
        <Sidebar />
        <Dashboard />
    </div>
);

export default App;
