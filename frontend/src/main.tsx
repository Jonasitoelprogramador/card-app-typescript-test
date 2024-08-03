import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // EntryProvider added here than than in App.ts
  <React.StrictMode>
      <App />
  </React.StrictMode>
)
