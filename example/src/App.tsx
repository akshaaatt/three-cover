import React from 'react'
import './res/css/styles.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages'
import ThreeLibraryPage from './pages/library'
import Slider from './pages/slider'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<ThreeLibraryPage />} />
      <Route path="/slider" element={<Slider />} />
    </Routes>
  )
}

export default App
