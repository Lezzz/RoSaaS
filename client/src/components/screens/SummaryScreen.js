import React from 'react';
import { Box, Link, Typography, useTheme, useMediaQuery, Collapse, Alert, TextField, Button, Card } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SummaryScreen = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();

    const [text , setText] = useState("");
    const [error, setError] = useState("");
    const [summary, setSummary] = useState("");

    const summaryHandler = async (e) => {
        e.preventDefault();
      
        try {
          const { data } = await axios.post("/summary", {text});
          setSummary(data);
        } catch (err) {
            console.error("Error during summary request:", err);
          if (err.response.data.error) {
            setError(err.response.data.error);
          } else if (err.message) {
            setError(err.message);
          }
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };
      
    

    return (
        <Box width={isNotMobile ? "40%" : "80%"} p="2rem" m="2rem auto" borderRadius={5} backgroundColor={theme.palette.background.alt} sx ={{boxShadow: 5}}>
        <Collapse in={error}>
            <Alert severity="error" sx={{mb: 2}}>{error}</Alert>
        </Collapse>

        <form onSubmit={summaryHandler}>
            <Typography variant="h3">Text Summarizer</Typography>
            <TextField placeholder ="Enter text:" margin="normal" required fullWidth value ={text} onChange={(e) => setText(e.target.value)}/>
            <Button fullWidth variant ="contained" type="submit" size="large" sx ={{color:"white", mt:2}}>Summarize</Button>  
        </form>
        { summary ? 
        <Card sx={{mt:4, p:2, border: 1, boxShadow:0, borderColor:"neutral.medium", borderRadius: 2, height: "500px", bgcolor: "background.default"}}>
            <Typography variant="h3">{summary}</Typography>
        </Card> 
        : <Card sx={{mt:4, p:2, border: 1, boxShadow:0, borderColor:"neutral.medium", borderRadius: 2, height: "500px", bgcolor: "background.default"}}>
                <Typography variant="h3">Summary will appear here:</Typography>
            </Card>}
        <Typography variant="body1" sx={{mt: 2}}>Not the tool you were looking for? <Link href="/">Go back</Link></Typography>
        
        </Box>
    )
}

export default SummaryScreen;