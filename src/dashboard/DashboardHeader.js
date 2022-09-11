import React from 'react';
import classnames from 'classnames';

const DashboardHeaderLabelItem = ({ label, color, orientation }) => (
    <div className="d-flex align-items-center">
        <div className={classnames('label-icon me-1', color)}></div>
        <div>{label} - {orientation}</div>
    </div>
);

const DashboardHeader = ({ leftAxisQuery, rightAxisQuery }) => (
    <div className="d-flex justify-content-between align-items-center px-2 dashboard-header">
        {leftAxisQuery && (
            <DashboardHeaderLabelItem
                label={leftAxisQuery.label}
                color={leftAxisQuery.color}
                orientation={leftAxisQuery.orientation.label}
            />
        )}
        {rightAxisQuery && (
            <DashboardHeaderLabelItem
                label={rightAxisQuery.label}
                color={rightAxisQuery.color}
                orientation={rightAxisQuery.orientation.label}
            />
        )}
    </div>
);

export default DashboardHeader;
