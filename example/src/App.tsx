import React from 'react';
import './res/css/styles.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import Home from './pages';
import ThreeLibraryPage from './pages/library';
import Slider from './pages/slider';

function App() {
    return (
        <Router>
                {
                    // @ts-ignore
                    <Route exact path='/' element={<Home/>}/>
                }
                {
                    // @ts-ignore
                    <Route exact path='/library' element={<ThreeLibraryPage/>}/>
                }
                {
                    // @ts-ignore
                    <Route exact path='/slider' element={<Slider/>}/>
                }
        </Router>
    );
}

export default App;
