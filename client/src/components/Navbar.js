import React, { useState, useEffect } from 'react';
import { Box, Link, Typography, useTheme, Button } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const theme = useTheme();
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("authToken")));
    const location = useLocation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        localStorage.removeItem("authToken");
        navigate('/');
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
    };

    useEffect(() => {
        const path = location.pathname;
        if (path !== '/login' && path !== '/register') {
            checkRefresh();
        }
    }, [location]);

    const createPortal = async () => {
        try {
            const token = await axios.get("/refresh-token");
            if (token.data) {
                const config = {headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token.data}` }};
                const customerId = await axios.get("/customer", config);
                if (customerId.data.customerId) {
                    const portal = await axios.post("/portal", { customerId: customerId.data.customerId }, config);
                    if (portal.data.url) {
                        window.open(portal.data.url, "_self");
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Box width="100%" p="1rem 6%" backgroundColor={theme.palette.background.alt} textAlign="center" sx={{ boxShadow: 3, mb: 2 }}>
            <Typography variant="h1" color="primary" fontWeight="bold"><Link href='/' sx={{ textDecoration: 'none' }}>SaaSAI</Link></Typography>
            {loggedIn ? 
                <>
                        <Button onClick={createPortal} color="primary">Billing Portal</Button> 
                        <Button onClick={logoutHandler}>Logout</Button>
                        
                </>: 
                    <>
                        <Button href="/register" p={1}>Register</Button> 
                        <Button href="/login" p={1}>Login</Button>
                    </>
            }
        </Box>
    );
};

export default Navbar;
