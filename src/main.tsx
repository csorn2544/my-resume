import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom';
import '@fontsource/inter';
import '@fontsource/inter/800.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter basename="/my-resume">
      <App />
    </HashRouter>
  </React.StrictMode>,
)
