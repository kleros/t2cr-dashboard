import './SideBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <div className="SideBar">
            <h1>T2CR</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tokens">Tokens</Link></li>
                <li><Link to="/badges">Badges</Link></li>
            </ul>
        </div>
    );
}

export default SideBar;