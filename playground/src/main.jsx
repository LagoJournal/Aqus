import React from 'react'
import { createRoot } from 'react-dom/client'
import '@agustin/aqus/styles.css'
import './showcase.css'
import { App } from './App.jsx'
import * as AqusExports from '@agustin/aqus'

// Components internally reference the old compiled bundle global
window.AgusDesignSystem_492a6f = AqusExports

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
