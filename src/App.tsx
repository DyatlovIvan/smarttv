import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {MainPage} from "./mainPage/mainPage";
import {PhonePage} from "./phonePage/phonePage";
import {URLS} from "./utils/urls";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path= {URLS.MAIN} element={<MainPage/>}/>
                {/*<Route path='/main' element={<MainPage/>}/>*/}
                <Route path={URLS.PHONEPAGE} element={<PhonePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
