import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';
import ThemeToggle from '../components/ThemeToggle';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-primary">
            <Navbar></Navbar>
            <main className="flex-1">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;