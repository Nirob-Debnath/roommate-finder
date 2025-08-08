import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark'; // load from localStorage
    });

    // update localStorage when theme changes
    React.useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <div data-theme={isDark ? "dark" : "light"}>
            <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;