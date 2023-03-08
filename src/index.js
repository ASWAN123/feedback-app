import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


const GOOGLE_LOGIN_KEY = process.env.REACT_APP_GOOGLE_LOGIN;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_LOGIN_KEY}>
  <HashRouter>
    <App />
    </HashRouter>
    </GoogleOAuthProvider>
);

reportWebVitals();


