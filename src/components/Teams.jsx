import axios from 'axios'
import React, { useEffect, useState } from 'react'
import KillGame from './KillGame'
import CardsSet from './CardsSet'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ScoreRed from './ScoreRed';
import ScoreBlue from './ScoreBlue';
// const  HOST = window.location.origin.replace(/^http/, 'ws')
// const client = new W3CWebSocket(HOST);
const client = new W3CWebSocket(`ws://127.0.0.1:4000`);


function Teams(props) {

    const [redSpy, setRedSpy]=useState("")
    const [blueSpy, setBlueSpy]=useState("")
    const [redAgents, setRedAgents]=useState([])
    const [blueAgents, setBlueAgents]=useState([])

    const [display1, setDisplay1]=useState(true)
    const [display2, setDisplay2]=useState(true)
    const [display3, setDisplay3]=useState(true)
    const [red, setRed] = useState(null)
    const [spy, setSpy] = useState(null)


    useEffect(()=>{
        console.log("Initial use effect ran in teams")
        axios.get(`/api/showTeams`)
        .then(res=>{
            console.log(res.data)
            setRedSpy(res.data.redSpy)
            setBlueSpy(res.data.blueSpy)
            setRedAgents(res.data.redAgents)
            setBlueAgents(res.data.blueAgents)
            if (res.data.allPlayers.includes(props.nickname)){
                setDisplay1(false)
            } 
            if (res.data.redSpy){
                setDisplay2(false)
            }
            if (res.data.blueSpy){
                setDisplay3(false)
            }
            if (res.data.blueSpy.includes(props.nickname)||res.data.redSpy.includes(props.nickname)){
                setSpy(true)
            } else {
              setSpy(false)
            }
            if (res.data.redSpy.includes(props.nickname)||res.data.redAgents.includes(props.nickname)){
              setRed(true)
            } else {
              setRed(false)
            }
            
        })
        .catch(err=>console.log(err))
      },[])


      useEffect(()=>{
        console.log("Use effect with web sockets ran in teams")
        client.onopen = () =>{
            console.log('WebSocket Client Connected');
        }
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
            if (dataFromServer.type==="updateTeams") {
                console.log("Ready to rock")
                axios.get(`/api/showTeams`)
                .then(res=>{
                    console.log(res.data)
                    setRedSpy(res.data.redSpy)
                    setBlueSpy(res.data.blueSpy)
                    setRedAgents(res.data.redAgents)
                    setBlueAgents(res.data.blueAgents)
                })
                .catch(err=>console.log(err))

            }
            
          };
    },[])
   
   

    const addRedSpy=()=>{
        client.send(JSON.stringify({
            type: "updateTeams",
            message: "New player joined!",
            nickname: props.nickname
          }));
        setSpy(true)
        const body ={
            nickname:props.nickname
        }
        axios.post(`/api/redSpy`,body)
        .then(res=>{
            console.log(res.data)
            setRedSpy(res.data.redSpy)
            setBlueSpy(res.data.blueSpy)
            setRedAgents(res.data.redAgents)
            setBlueAgents(res.data.blueAgents)
            setDisplay1(false)
        })
        .catch(err=>console.log(err))
        let body1={
            message: `${props.nickname} joined red team as a spy`,
            nickname: "Game"
          }
          axios.post("/api/post", body1)
          //[ { message_id: 1, message: '123', nickname: '1' } ]
          .then(res=>{
            console.log(res.data)
          })
          .catch(err=>console.log(err))
          client.send(JSON.stringify({
            type: "newPlayer",
            message: `${props.nickname} joined red team as a spy`,
            nickname: "Game"
          }));
          setRed(true)
          setSpy(true)
    }

    const addBlueSpy=()=>{
        client.send(JSON.stringify({
            type: "updateTeams",
            message: "New player joined!",
            nickname: props.nickname
          }));
        setSpy(true)
        const body = {
            nickname:props.nickname
        }
        axios.post(`/api/blueSpy`,body)
        .then(res=>{
            console.log(res.data)
            setRedSpy(res.data.redSpy)
            setBlueSpy(res.data.blueSpy)
            setRedAgents(res.data.redAgents)
            setBlueAgents(res.data.blueAgents)
            setDisplay1(false)
        })
        .catch(err=>console.log(err))
        let body1={
            message: `${props.nickname} joined blue team as a spy`,
            nickname: "Game"
          }
          axios.post("/api/post", body1)
          //[ { message_id: 1, message: '123', nickname: '1' } ]
          .then(res=>{
            console.log(res.data)
          })
          .catch(err=>console.log(err))
          client.send(JSON.stringify({
            type: "newPlayer",
            message: `${props.nickname} joined blue team as a spy`,
            nickname: "Game"
          }));
          setRed(false)
          setSpy(true)
    }

    const addRedAgent=()=>{
        client.send(JSON.stringify({
            type: "updateTeams",
            message: "New player joined!",
            nickname: props.nickname
          }));
        const body ={
            nickname:props.nickname
        }
        axios.post(`/api/redAgent`,body)
        .then(res=>{
            console.log(res.data)
            setRedSpy(res.data.redSpy)
            setBlueSpy(res.data.blueSpy)
            setRedAgents(res.data.redAgents)
            setBlueAgents(res.data.blueAgents)
            setDisplay1(false)
        })
        .catch(err=>console.log(err))
        let body1={
            message: `${props.nickname} joined red team as an agent`,
            nickname: "Game"
          }
          axios.post("/api/post", body1)
          //[ { message_id: 1, message: '123', nickname: '1' } ]
          .then(res=>{
            console.log(res.data)
          })
          .catch(err=>console.log(err))
          client.send(JSON.stringify({
            type: "newPlayer",
            message: `${props.nickname} joined red team as an agent`,
            nickname: "Game"
          }));
          setRed(true)
          setSpy(false)
    }

    const addBlueAgent=()=>{
        client.send(JSON.stringify({
            type: "updateTeams",
            message: "New player joined!",
            nickname: props.nickname
          }));
        const body ={
            nickname:props.nickname
        }
        axios.post(`/api/blueAgent`,body)
        .then(res=>{
            console.log(res.data)
            setRedSpy(res.data.redSpy)
            setBlueSpy(res.data.blueSpy)
            setRedAgents(res.data.redAgents)
            setBlueAgents(res.data.blueAgents)
            setDisplay1(false)
        })
        .catch(err=>console.log(err))
        let body1={
            message: `${props.nickname} joined blue team as an agent`,
            nickname: "Game"
          }
          axios.post("/api/post", body1)
          //[ { message_id: 1, message: '123', nickname: '1' } ]
          .then(res=>{
            console.log(res.data)
          .catch(err=>console.log(err))
          })
          client.send(JSON.stringify({
            type: "newPlayer",
            message: `${props.nickname} joined red team as an agent`,
            nickname: "Game"
          }));
          setRed(false)
          setSpy(false)
    }

  return (
    <div className="gameField">
        <div className='gameTopDiv'>
        
        <div className='redTeam' >
            <h3 style={{color:"white"}}> Spy: {redSpy}</h3>
            
            <h3 style={{color:"white"}}>Agents: {redAgents}</h3>
            {display1 &&<div className='roleButtons'>
                {display2 &&<button
                className='roleButtons'
                onClick={addRedSpy}
                >Join as a spy</button>}
                <button
                onClick={addRedAgent}
                className='roleButtons'
                >Join as an agent</button>
            </div>}
        </div>
        <div className='redScore'>
                  <ScoreRed />
        </div>
        <div className='topCenter'>
            <h1>Admin is {props.admin}</h1>
            {props.nickname === props.admin &&
            <KillGame />
            }
        </div>
        <div className='blueScore'>
                  <ScoreBlue />
        </div>
        <div className='blueTeam'>
            <h3 style={{color:"white"}}>Spy: {blueSpy}</h3>
            <h3 style={{color:"white"}}>Agents: {blueAgents}</h3>
            {display1 &&<div >
                {display3 && < button
                className='roleButtons'
                onClick={addBlueSpy}
                >Join as a spy</button>}
                <button
                className='roleButtons'
                onClick={addBlueAgent}
                >Join as an agent</button>
            </div>}
        </div>
    </div>
    {!display1 && <CardsSet nickname={props.nickname} admin={props.admin} spyStatus={spy} redTeam={red}/> }
    </div>
    

  )
}

export default Teams
