import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {MainPage} from "./mainPage/mainPage";
import {PhonePage} from "./phonePage/phonePage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
                <Route path='/phonePage' element={<PhonePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
