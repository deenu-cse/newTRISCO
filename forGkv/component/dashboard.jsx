import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../Styles/Dashboard.css';
import Dashtool from './Dashtool';
import Forms from './Forms';
import Widgets from './Widgets';
import Tabel from './Tabel';
import Pages from './Pages';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="fullflex">
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
        </div>
    );
}
