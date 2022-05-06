import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';


const  HOST = window.location.origin.replace(/^http/, 'ws')
const client = new W3CWebSocket(HOST);
// const client = new W3CWebSocket(`ws://127.0.0.1:4000`);

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;


function ChatTest(props) {

    //const [userName, setUserName]=useState(props.nickname)
    const [messages, setMessages]=useState([])
    const [searchVal, setSearchVal]=useState("")

  const  onButtonClicked = (value) => {
        client.send(JSON.stringify({
          type: "message",
          message: value,
          nickname: props.nickname
        }));
        setSearchVal("")
        let body={
          message: value,
          nickname: props.nickname
        }
        axios.post("/api/post", body)
        //[ { message_id: 1, message: '123', nickname: '1' } ]
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>console.log(err))
      }
    

    useEffect(()=>{
      axios.get("/api/show")
      .then(res=>{
        setMessages(res.data.reverse())
      })
    },[])


    useEffect(()=>{
        client.onopen = () =>{
            console.log('WebSocket Client Connected');
        }
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);

            if (dataFromServer.type === "message") {
                setMessages([{
                    message: dataFromServer.message,
                    nickname: dataFromServer.nickname
                },...messages])
            }
            if (dataFromServer.type === "cardClick") {
              setMessages([{
                  message: dataFromServer.message,
                  nickname: dataFromServer.nickname
              },...messages])
            }
            if (dataFromServer.type === "newCards") {
              setMessages([{
                  message: dataFromServer.message,
                  nickname: dataFromServer.nickname
              },...messages])
            }
            if (dataFromServer.type === "newPlayer") {
              setMessages([{
                  message: dataFromServer.message,
                  nickname: dataFromServer.nickname
              },...messages])
            }
            if (dataFromServer.type === "clue") {
              setMessages([{
                  message: dataFromServer.message.message,
                  nickname: dataFromServer.nickname
              },...messages])
            }
          };
    })
    

  return (

    <div className="main" >
      <div className="title" >
        <h3 style={{color:"white"}}>Logged in as: {props.nickname}</h3>
        <button style={{color:"black", borderRadius:"15px", backgroundColor: "white"}}
        onClick={()=>window.location.reload(false)}
        >log out</button>
      </div>
      <div  >
          <div
          style={{marginTop:"10px"}}
          >
            <input
            style={{width:"250px", height:"30px", borderRadius:"20px"}}
            placeholder="Type your message here:"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value )}
            ></input>
            <button
            style={{borderRadius:"15px"}}
            onClick={()=>onButtonClicked(searchVal)}
            >send</button>
          </div>
      </div> 

      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50,  maxHeight:"85vh",
  overflow:"scroll", overflowX:"hidden"}} >
        {messages.map((message,index) => 
          <Card key={index} style={{ width: 300, margin: '16px 4px 0 4px', borderRadius: "30px", borderWidth:"2px", borderColor:"black",
           alignSelf: props.nickname === message.nickname ? 'flex-end' : 'flex-start' }} loading={false}>
            <Meta style={{fontColor:"black", fontWeight:"bold"}}
              avatar={
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.nickname[0].toUpperCase()}</Avatar>
              }
              title={message.nickname+":"}
              description={message.message}
            />
          </Card> 
        )}
      </div>
  </div>
  )
}


export default ChatTest