import React, { useState } from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import axios from 'axios';

const Navbar = () => {
    const theme = useTheme();
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("authToken")));

    const logoutHandler = async () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    const checkRefresh = async () => {

        try {
            setLoggedIn(JSON.parse(localStorage.getItem("authToken")));
            const token = await axios.get("/refresh-token");
            if (!token.data) {
                 localStorage.removeItem("authToken");
                 setLoggedIn(false);
                 logoutHandler();
            }
        } catch (err) {
            console.error(err);
        }

    }

    checkRefresh();

    return (
        <Box width= "100%" p="1rem 6%" backgroundColor = {theme.palette.background.alt} textAlign ="center" sx={{boxShadow: 3, mb: 2}}>  
            <Typography variant="h1" color="primary" fontWeight="bold"><Link href='/' sx={{ textDecoration: 'none' }}>SaaSAI</Link></Typography>
            { loggedIn ? <Link href="/" onClick ={logoutHandler} p={2}>Logout</Link> : <><Link href="/register" p={1}>Register</Link>
            <Link href="/login" p={1}>Login</Link></> }
        
        </Box>
    )
}

export default Navbar;