import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../Styles/Dashboard.css';
import Dashtool from './Dashtool';
import Forms from './Forms';
import Widgets from './Widgets';
import Tabel from './Tabel';
import Pages from './Pages';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [IsValidAdmin, setIsValidAdmin] = useState(false);

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('userToken');

                const response = await fetch('http://localhost:3000/admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.valid) {
                    setIsValidAdmin(true);
                } else {
                    setIsValidAdmin(false);
                }
            } catch (error) {
                console.error('Admin check failed:', error);
                setIsValidAdmin(false);
            }
        };
        checkAdmin();
    }, [navigate]);

    return (
        <div className="fullflex">
            {!IsValidAdmin ? (
                <div className="login-container">
                    <div className="message-box">
                        <p>You are not an admin. Please log in to continue.</p>
                        <NavLink to={'/userAuth/login'}>
                            <a className="login-button">Login</a>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <>
                    <div className="left">
                        <Sidebar onTabSelect={handleTabSelect} />
                    </div>
                    <div className="right">
                        <Navbar />
                        {activeTab === 'dashboard' && <Dashtool onTabSelect={handleTabSelect} />}
                        {activeTab === 'forms' && <Forms />}
                        {activeTab === 'widgets' && <Widgets />}
                        {activeTab === 'tables' && <Tabel />}
                        {activeTab === 'pages' && <Pages />}
                    </div>
                </>
            )}
        </div>
    );
}
