import React from 'react'
import "./navbar.css"
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo_content">
                <div className="logo">
                    <h2>CALORIE-TRACKER</h2>
                </div>
            </div>
            <div className="contents-right">
                <div className="content">
                    <p><a href="">Home</a></p>
                    <p><a href="">What is Calorie-Tracker?</a></p>
                </div>
                <div className="btns">
                    <button className='signin'>Sign in</button>
                    <button className='signup'>
                        Sign Up
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Navbar


