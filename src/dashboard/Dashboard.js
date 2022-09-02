import React from 'react';

import DashboardEmpty from './DashboardEmpty';
import DashboardLineGraph from './DashboardLineGraph';

import './Dashboard.scss';

const Dashboard = ({ isLoading, data = [] }) => {
    return <div className="dashboard mx-2 max-height">{!data.length ? <DashboardLineGraph isLoading={isLoading} /> : <DashboardEmpty />}</div>;
};

export default Dashboard;
