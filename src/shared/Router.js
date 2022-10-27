import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Games from "../pages/Games";
import Game from "../pages/Game";
import AddGame from "../pages/AddGame";

const Router =() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Games />} />
                <Route path='/works/:id' element={<Game />} />
                <Route path="/work/add" element={<AddGame />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router