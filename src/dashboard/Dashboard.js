import React from 'react';

import DashboardEmpty from './DashboardEmpty';
import DashboardHeader from './DashboardHeader';
import DashboardGraphSpinner from './DashboardGraphSpinner';
import DashboardLineGraph from './DashboardLineGraph';

import './Dashboard.scss';

const Dashboard = ({ isLoading, leftAxis, rightAxis }) => {
    return (
        <div className="dashboard mx-2 max-height d-flex flex-column">
            <DashboardHeader leftAxisQuery={leftAxis?.query} rightAxisQuery={rightAxis?.query} />
            {isLoading ? (
                <DashboardGraphSpinner />
            ) : (
                <>
                    {(leftAxis?.data || rightAxis?.data) && <DashboardLineGraph leftAxis={leftAxis} rightAxis={rightAxis} />}
                    {!(leftAxis?.data || rightAxis?.data) && <DashboardEmpty />}
                </>
            )}
        </div>
    );
};

export default Dashboard;
