import React from 'react';
import { Box, Link, Typography, useTheme, useMediaQuery, Collapse, Alert, TextField, Button, Card, Stack } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <Box p={2}>
            <Typography sx={{ fontWeight: "bold"}} variant="h4" mb={2}>Text Generation</Typography>
            <Stack direction="row" spacing={6}>
                <Card onClick={() => navigate("/summary")}
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

        </Box>
    )
}

export default HomeScreen;