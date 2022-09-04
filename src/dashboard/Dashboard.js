import React from 'react';

import DashboardEmpty from './DashboardEmpty';
import DashboardGraphSpinner from './DashboardGraphSpinner';
import DashboardLineGraph from './DashboardLineGraph';

import './Dashboard.scss';

const noData = [];

const Dashboard = ({ isLoading, xAxisData, yAxisData }) => {
    return (
        <div className="dashboard mx-2 max-height">
            {isLoading ? (
                <DashboardGraphSpinner />
            ) : (
                <>
                    {(xAxisData || yAxisData) && <DashboardLineGraph xAxisData={xAxisData || noData} yAxisData={yAxisData || noData} />}
                    {!(xAxisData || yAxisData) && <DashboardEmpty />}
                </>
            )}

        </div>
    );
};

export default Dashboard;
