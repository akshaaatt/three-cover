import React from 'react';
import './res/css/styles.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import ThreeLibraryPage from './pages/library';
import Slider from './pages/slider';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/three-cover' element={<Home />} />
                <Route path='/three-cover/library' element={<ThreeLibraryPage/>} />
                <Route path='/three-cover/slider' element={<Slider/>} />
            </Routes>
        </Router>
    );
}

export default App;
