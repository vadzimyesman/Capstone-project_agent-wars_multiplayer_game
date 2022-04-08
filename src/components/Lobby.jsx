import axios from 'axios'
import React, { useState } from 'react'
import Game from './Game'





function Lobby(props) {

  const [display1,setDisplay1]=useState(true)
  const [display2,setDisplay2]=useState(false)


  const handleClick1 = () =>{
    setDisplay1(false)
    setDisplay2(true)
    const body = {
      nickname: props.nickname
    }
    axios.post(`/api/startNew`,body)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  }

  const handleClick2 = () =>{
        setDisplay2(true)
        setDisplay1(false)

    }




  return (
    
    <>

    
    <div className='lobbyDiv'>
    {display1 &&  
      <div className='lobbyInside'>
      <h1 className='welcome'>Welcome to Agent Wars, {props.nickname+"!"}</h1>
      <div style={{width:"100%"}}>
        {!props.adminStatus &&
        <button 
        className='lobbyButtons'
        onClick={handleClick1}
        >Start new game</button>}
        {props.adminStatus &&<button
        className='lobbyButtons'
        onClick={handleClick2}
        >Join game</button>}
      </div>
        <div className='rulesDiv' style={{display:'flex', flexDirection:"column",alignItems:"flex-start"}}>
          <h1 style={{marginLeft:"38px", fontSize:"40px"}}>Instructions:</h1>
          <ul>
            <li ><h2 style={{textAlign:"start"}}>Click "join game" or "start new game" (if available) to start the game.</h2></li>
            <li ><h2 style={{textAlign:"start"}}>Pick an available role. Make sure you keep teams balanced.</h2></li>
            <li><h2 style={{textAlign:"start"}}>Wait for your role's turn.</h2></li>
            <li><h2 style={{textAlign:"start"}}>If you are a spy: combine as many of your team's words as you can with </h2>
                <h2 style={{textAlign:"start"}}>an appropriate clue. During your turn type a clue in the window </h2>
                <h2 style={{textAlign:"start"}}>on the bottom, choose the number of words you combined with that clue.</h2>
            </li>
            <li><h2 style={{textAlign:"start"}}>If you are an agent: wait for your role's turn. Try to find hidded words. open </h2></li>
                <h2 style={{textAlign:"start"}}>them by clicking on the cards. Click "end guessing" to end your turn.</h2>
          </ul>
        </div>
      </div>}
      {display2 && <Game nickname={props.nickname} admin={props.adminName}/>}
    </div>

    
    
    </>
  )
}

export default Lobby