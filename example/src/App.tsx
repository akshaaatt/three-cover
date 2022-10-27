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
                <Route path='/' element={<Home/>}/>
                <Route path='/library' element={<ThreeLibraryPage/>}/>
                <Route path='/slider' element={<Slider/>}/>
            </Routes>
        </Router>
    );
}

export default App;
