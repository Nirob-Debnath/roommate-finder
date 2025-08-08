import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ toggleTheme }) => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    const handleLogOut = () => {
        console.log("User trying to LogOut");
        logOut()
            .then(() => {
                alert("You Logged Out successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/addtofindroommate'>Add to Find Roommate</NavLink></li>
                        <li><NavLink to='/browselisting'>Browse Listing</NavLink></li>
                        <li><NavLink to='/mylisting'>My Listing</NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">Roommate Finder</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/addtofindroommate'>Add to Find Roommate</NavLink></li>
                    <li><NavLink to='/browselisting'>Browse Listing</NavLink></li>
                    <li><NavLink to='/mylisting'>My Listing</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end gap-2 items-center">
                {user ? (
                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <img
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                src={user.photoURL || '/default-avatar.png'}
                                alt="User Avatar"
                            />
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {user.email}
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="btn btn-primary px-6">
                            LogOut
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-primary px-6">Login</Link>
                        <NavLink to="/signup" className="btn">Sign Up</NavLink>
                    </>
                )}
            </div>
            <input type="checkbox" value="synthwave" className="toggle theme-controller mx-2" onClick={toggleTheme} />
        </div>
    );
};

export default Navbar;
