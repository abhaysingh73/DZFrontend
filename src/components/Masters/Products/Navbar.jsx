import React, {useState} from 'react';
import '../../../css/Navbar.css';
const Navbar = ({ onSelectTab }) => {

    const [atciveTab, setActiveTab] = useState('products');

    const handleActiveTab = (tab) => {
        onSelectTab(tab);
        setActiveTab(tab);
    }

    return (
        <div className="in-page-navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <span onClick={() => handleActiveTab('products')} className={`navbar-link ${atciveTab === 'products' ? 'sub-nav-active' : ''}`}>Products</span>
                </li>
                <li className="navbar-item">
                    <span onClick={() => handleActiveTab('add')} className={`navbar-link ${atciveTab === 'add' ? 'sub-nav-active' : ''}`}>Add New</span>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
