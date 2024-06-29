import { UserButton } from '@clerk/nextjs';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <h1>DashboardPage</h1>
            <UserButton afterSignOutUrl='/' />
        </div>
    );
};

export default DashboardPage;
