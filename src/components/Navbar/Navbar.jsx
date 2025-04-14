import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../../UserContext';
import API from '../../Api';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await API.post("/api/onboard/logout");
            localStorage.removeItem("accessToken");
            setUser(null); // Clear user state
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg customStyle" data-bs-theme="dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse d-none d-lg-block" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/home' className="nav-link whiteColor">Home</NavLink>
                            </li>

                            {user ? (
                                <><li className="nav-item">
                                    <NavLink to='/create-sale' className="nav-link whiteColor">Create Sale</NavLink>
                                </li>
                                    <li className="nav-item dropdown">
                                        <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Sales
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to='/sales-overview' className="nav-link whiteColor">Sales Overview</NavLink></li>
                                            <li><NavLink to='/sales-reports' className="nav-link whiteColor">Sales Reports</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><NavLink to='/sales-wall' className="nav-link whiteColor">Sales Wall</NavLink></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Masters
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to='/masters-products' className="nav-link whiteColor">Products</NavLink></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Digital Card
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to='/onboard' className="nav-link whiteColor">Update Info</NavLink></li>
                                            <li><NavLink to='/themes' className="nav-link whiteColor">Themes</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><NavLink to='/view-card' className="nav-link whiteColor">View Card</NavLink></li>
                                        </ul>
                                    </li></>) : (<></>)}
                        </ul>

                        <form className="d-flex">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            {user ? (
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.contactName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className="dropdown-item whiteColor" type="button"><i className="fa fa-user" aria-hidden="true"></i> Profile</button></li>
                                        <li><button className="dropdown-item whiteColor" type="button"><i className="fa fa-cog" aria-hidden="true"></i> Settings</button></li>
                                        <li><hr className="dropdown-divider whiteColor" /></li>
                                        <li onClick={() => logout()}><button className="dropdown-item whiteColor" type="button"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button></li>
                                    </ul>
                                </div>)
                                :
                                (<div className="btn-group">
                                    <NavLink to='/login' className="nav-link whiteColor">LOGIN</NavLink>
                                </div>)
                            }
                        </form>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start  bg-primary customNavW"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel" data-bs-theme="dark">
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <NavLink to='/home' className="nav-link whiteColor">Home</NavLink>
                        </li>
                        {user ? (
                                <>
                        <li className="nav-item">
                            <NavLink to='/create-sale' className="nav-link whiteColor">Create Sale</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sales
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink to='/sales-overview' className="nav-link whiteColor">Sales Overview</NavLink></li>
                                <li><NavLink to='/sales-reports' className="nav-link whiteColor">Sales Reports</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><NavLink to='/sales-wall' className="nav-link whiteColor">Sales Wall</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Masters
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink to='/masters-products' className="nav-link whiteColor">Products</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="whiteColor nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Digital Card
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink to='/onboard' className="nav-link whiteColor">Update Info</NavLink></li>
                                <li><NavLink to='/themes' className="nav-link whiteColor">Themes</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><NavLink to='/view-card' className="nav-link whiteColor">View Card</NavLink></li>
                            </ul>
                        </li></>) : (<></>)}
                    </ul>
                    <form className="">
                        {user ? (
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item whiteColor" type="button"><i className="fa fa-user" aria-hidden="true"></i> Profile</button></li>
                                    <li><button className="dropdown-item whiteColor" type="button"><i className="fa fa-cog" aria-hidden="true"></i> Settings</button></li>
                                    <li><hr className="dropdown-divider whiteColor" /></li>
                                    <li onClick={() => logout}><button className="dropdown-item whiteColor" type="button"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button></li>
                                </ul>
                            </div>)
                            :
                            (<div className="btn-group">
                                <NavLink to='/login' className="nav-link whiteColor">LOGIN</NavLink>
                            </div>)}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Navbar;
