import './SideBar.css';
import React from 'react';
import Logo from './Logo';
import NavBar from "./NavBar";
import bannerImg from "../../assets/images/banner.png";

function SideBar() {
    return (
        <div className="SideBar">
            <Logo />
            <NavBar />
            <div className="SideBar__Banner">
                <a href="https://tokens.kleros.io/"><img src={bannerImg} alt="Banner"/></a>
            </div>
        </div>
    );
}

export default SideBar;