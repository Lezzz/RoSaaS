import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Box, Typography, Card, Stack, Collapse, Alert } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    //price_1Mvw1dEuwdm0l6U90Nqsg4rY
    const handleCheckout = async (e) => { 
        e.preventDefault();
        try {
            const token = await axios.get("/refresh-token");
            if (token.data){
                const config = {headers: {Authorization: `Bearer ${token.data}`, "Content-Type": "application/json"}};
                const sub = await axios.get("/subscription", config);
                console.log(sub);
                //navigate("/summary")
                
            } else {
                setError("Please login to continue.");
            }

        } catch (err) {
            if (err.response.data.message){
                setError(err.response.data.message);
                setTimeout(() => {setError("");}, 3000);
            } else if (err.message) {
                setError(err.message);
                setTimeout(() => {setError("");}, 3000);
            }
            console.log(err);
        }
    }

    return (
        <Box p={2}>
            <Collapse in={error}>
              <Alert severity="error" sx={{mb: 2}}>{error}</Alert>
            </Collapse>
            <Typography sx={{ fontWeight: "bold"}} variant="h4" my={2}>Text Generation</Typography>
            <Stack direction="row" spacing={6}>
                <Card onClick={ handleCheckout }
                    sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"}}}>
                    <DescriptionRoundedIcon sx={{fontSize: 40, color: "primary.main", mt: 2, ml:2}}/>
                    <Stack p={2} po={0}>
                        <Typography variant="h5" sx={{ fontWeight: "bold"}}>Text Summarizer</Typography>
                        <Typography variant="h6">Summarize long and articles into just a few sentences!</Typography>
                    </Stack>
                </Card>
                <Card onClick={() => navigate("/paragraph")}
                    sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"}}}>
                    <FormatAlignLeftRoundedIcon sx={{fontSize: 40, color: "primary.main", mt: 2, ml:2}}/>
                    <Stack p={2} po={0}>
                        <Typography variant="h5" sx={{ fontWeight: "bold"}}>Paragraph Generator</Typography>
                        <Typography variant="h6">Generate an informative blurb about any topic.</Typography>
                    </Stack>
                </Card>
                <Card onClick={() => navigate("/chatbot")}
                    sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"}}}>
                    <ChatRoundedIcon sx={{fontSize: 40, color: "primary.main", mt: 2, ml:2}}/>
                    <Stack p={2} po={0}>
                        <Typography variant="h5" sx={{ fontWeight: "bold"}}>Spaima Profesorilor</Typography>
                        <Typography variant="h6">Your very own virtual assistant!</Typography>
                    </Stack>
                </Card>
            </Stack>

            <Typography sx={{ fontWeight: "bold"}} variant="h4" ml={4} mt={6} mb={2}>Code Generation</Typography>
                <Card onClick={() => navigate("/jsConvert")}
                    sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"}}}>
                    <DescriptionRoundedIcon sx={{ml: 2, fontSize: 40, color: "primary.main", mt: 2}}/>
                    <Stack p={2} po={0}>
                        <Typography variant="h5" sx={{ fontWeight: "bold"}}>Javascript converter</Typography>
                        <Typography variant="h6">English to Javascript code!</Typography>
                    </Stack>
                </Card>

                <Typography sx={{ fontWeight: "bold"}} variant="h4" ml={4} mt={6} mb={2}>Image Generation</Typography>
                <Card onClick={() => navigate("/imageGen")}
                    sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"}}}>
                    <ImageSearchRoundedIcon sx={{ml: 2, fontSize: 40, color: "primary.main", mt: 2}}/>
                    <Stack p={2} po={0}>
                        <Typography variant="h5" sx={{ fontWeight: "bold"}}>Image Generator</Typography>
                        <Typography variant="h6">Generate images from a simple prompt.</Typography>
                    </Stack>
                </Card>
        </Box>
    )
}

export default HomeScreen;