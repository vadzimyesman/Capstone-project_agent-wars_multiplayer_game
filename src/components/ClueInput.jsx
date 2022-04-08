import axios from 'axios'
import React, { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
// const  HOST = window.location.origin.replace(/^http/, 'ws')
// const client = new W3CWebSocket(HOST);

const client = new W3CWebSocket(`ws://127.0.0.1:4000`);

function ClueInput(props) {


  const [clue, setClue] = useState("")
  const [numberOfWords, setNumberOfWords] = useState("1")

  const handleSubmit = (e) =>{
    e.preventDefault()
    let body = {
      nickname: props.nickname,
      red: props.red,
      clue,
      numberOfWords
    }
    console.log(body)
    setClue("")
    axios.post("api/newClue", body)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
    axios.get("api/nextTurn")
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
    client.send(JSON.stringify({
      type: "clue",
      message: {
        numberOfWords:numberOfWords,
        message:`${props.red? "Red":"Blue"} spy ${props.nickname} gave a clue ${clue} for ${numberOfWords} words`
      },
      nickname: "Game"
    }));
  }

  return (
    <div>
        <form className='clueForm'>
            <input
                style={{borderRadius:"20px", width:"300px", marginRight:"5px", marginBottom:"5px"}}
                placeholder='Type yor clue:'
                onChange={e=>setClue(e.target.value)}
                value={clue}
                >
            </input>
            <select name="choice" defaultValue="one"
            style={{borderRadius:"15px", height:"28px", borderWidth:"2px"}}
            onChange={e=>setNumberOfWords(e.target.value)}   
            >
                <option value="1" >1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8" >8</option>
                <option value="infinity">∞</option>
            </select>
            &nbsp;
            <button
            style={{borderRadius:"15px",height:"28px"}}
            onClick={handleSubmit}
            >give clue</button>
        </form> 
    </div>
  )
}

export default ClueInput