import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative h-full'>
            <div className='md:insert-y-0 z-[100] hidden h-full md:fixed md:flex md:w-72 md:flex-col'>
                <Sidebar />
            </div>
            <main className='md:pl-72'>
                <Navbar />
                <div className='space-y-10 px-4 pb-6 lg:px-8'>{children}</div>
                <Toaster />
            </main>
        </div>
    );
};

export default DashboardLayout;
