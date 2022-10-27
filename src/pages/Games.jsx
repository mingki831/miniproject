import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import GameList from "../game/GameList";


const Games = () =>{
    
    return (
        <>
        <Header/>
        <Stlayout>
            <h1><StTitle>Join the Game !</StTitle></h1>
            <GameList/>
        </Stlayout>
        </>
    )
}

export default Games;

const Stlayout = styled.div`
    margin: 0 auto;
    max-width: 1000px;
    min-width: 800px;
    color: #ffffff;
`
const StTitle = styled.div`
  margin-top: 100px;
  text-align: center;
`;