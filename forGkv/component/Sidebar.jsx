import React, { useState } from 'react';
import '../Styles/Sidebar.css';

export default function Sidebar({ onTabSelect }) {
    const [dash, setdash] = useState(false);
    const [eli, seteli] = useState(false);
    const [widget, setwidget] = useState(false);
    const [forms, setforms] = useState(false);
    const [tables, settables] = useState(false);
    const [pages, setpages] = useState(false);

    const handleTabClick = (tab) => {
        setdash(false);
        seteli(false);
        setwidget(false);
        setforms(false);
        settables(false);
        setpages(false);

        if (tab === 'dashboard') setdash(true);
        if (tab === 'elements') seteli(true);
        if (tab === 'widgets') setwidget(true);
        if (tab === 'forms') setforms(true);
        if (tab === 'tables') settables(true);
        if (tab === 'pages') setpages(true);

        onTabSelect(tab);
    };

    return (
        <>
            <div className="sidebar">
                <div className="myName">
                    <div className="flex1">
                        <img src='https://img.icons8.com/?size=100&id=11781&format=png&color=ff0000' />
                        <h3>GKV</h3>
                    </div>
                    <div className="detail">
                        <img src='https://i.pinimg.com/736x/8c/4c/04/8c4c044612ab6c514e86406e13bb6d57.jpg' />
                        <div className="name">
                            <h3>Deendayal</h3>
                            <h5>Admin</h5>
                        </div>
                    </div>
                </div>
                <div className="alltabs">
                    <div className="tabs">
                        <ul>
                            <li onClick={() => handleTabClick('dashboard')} className={dash ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=87061&format=png&color=737373' />
                                Dashboard
                            </li>
                            <li onClick={() => handleTabClick('elements')} className={eli ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=96831&format=png&color=737373' />
                                Elements
                            </li>
                            <li onClick={() => handleTabClick('widgets')} className={widget ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=78290&format=png&color=737373' />
                                Widgets
                            </li>
                            <li onClick={() => handleTabClick('forms')} className={forms ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=PlIl90R4CgDV&format=png&color=737373' />
                                Forms
                            </li>
                            <li onClick={() => handleTabClick('tables')} className={tables ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=L9ozgLYbNbcq&format=png&color=737373' />
                                Tables
                            </li>
                            <li onClick={() => handleTabClick('pages')} className={pages ? 'active' : ''}>
                                <img src='https://img.icons8.com/?size=100&id=37932&format=png&color=737373' />
                                Pages
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
