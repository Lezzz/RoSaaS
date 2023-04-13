import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {themeSettings} from './theme';
import Navbar from './components/Navbar';
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import SummaryScreen from './components/screens/SummaryScreen';
import ParagraphScreen from './components/screens/ParagraphScreen';
import ChatbotScreen from './components/screens/ChatbotScreen';
import JavaScriptScreen from './components/screens/JavaScriptScreen';
import ImageScreen from './components/screens/ImageScreen';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PrivateRoute from './components/routing/PrivateRoute';
import NormalWrapper from './components/routing/NormalWrapper';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
//price_1Mvw1dEuwdm0l6U90Nqsg4rY

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/register" element={<RegisterScreen />} />
            <Route exact path="/summary" element={<NormalWrapper> <PrivateRoute>  <SummaryScreen /> </PrivateRoute></NormalWrapper> } />
            <Route exact path="/paragraph" element={<ParagraphScreen />} />
            <Route exact path="/chatbot" element={<ChatbotScreen />} />
            <Route exact path="/jsConvert" element={<JavaScriptScreen />} />
            <Route exact path="/imageGen" element={<ImageScreen />} />
          </Routes>
        </ThemeProvider>
      </div>
    </Elements>
  );
}

export default App;
