import React from "react";
const Header = () => {
return(
    <header className="сontanerHeader">        
        <svg className="unsplashLogo" version="1.1" width="30" height="30" viewBox="0 0 32 32" aria-labelledby="unsplash-home" aria-hidden="false" href="https://unsplash.com/" fill="#FFF">
            <title id="unsplash-home">Unsplash Home</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>       

        <nav className="navMenu">
            <ul className="navItems">											
                <li className="itemNav iN1">Editorial</li>
                <li className="itemNav iN2">Following</li>
                <li className="itemNav iN3">Wallpapers</li>
                <li className="itemNav iN4">Nature</li>
                <li className="itemNav iN5">People</li>
                <li className="itemNav iN6">Architecture</li>	
                <li className="itemNav iN7">Current Events</li>	
                <li className="itemNav iN8">Experimental</li>		
                <li className="itemNav iN9">View all</li>
                <li className="itemIcon">&#9776;</li>						
            </ul>
        </nav>
        <img src="img/userLogin.png" alt="Avatar" className="userIcon"/>
        <p className="userName">Login</p>        		
    </header>
        
)}

export default Header;
