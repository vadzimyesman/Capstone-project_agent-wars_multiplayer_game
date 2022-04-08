import axios from 'axios'
import React, { useState, useEffect } from 'react'





function CardWithWord(props) {
  


  const [buttonColor, setButtonColor] = useState(props.color)
  const [buttonContent, setButtonContent] = useState(props.randomWord)

useEffect(()=>{
  if (props.array.includes(props.index)){
    setButtonColor(props.color1)
      if (props.spy){
        setButtonContent("")
      }
  }
},[props.array])



  const handleClick = ()=> {
    setButtonColor(props.color1)
    props.client.send(JSON.stringify({
      index: props.index,
      type: "cardClick",
      message: `${props.nickname} clicked on the ${props.randomWord}`,
      nickname: "Game",
      color: props.color1
    }));
    let body1={
      message: `${props.nickname} clicked on the ${props.randomWord}`,
      nickname: "Game"
    }
    axios.post("/api/post", body1)
    //[ { message_id: 1, message: '123', nickname: '1' } ]
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
    axios.put(`/api/addOpening/${props.index}`)
    //[ { message_id: 1, message: '123', nickname: '1' } ]
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
    if (props.maxClicks!==0){
      if(props.color1==="black"){
        props.clickedBlack(true)
      }
      if((props.red&&props.color1==="red")||(!props.red&&props.color1==="blue")){
        props.setMaxClicks(props.maxClicks-1)
        console.log("Right color clicked!")
        console.log(props.maxClicks)
      } else {
        axios.get("api/nextTurn")
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        props.client.send(JSON.stringify({
          type: "turn",
          message: `Turn is over`,
        }));
      }
    } else {
      axios.get("api/nextTurn")
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
      props.client.send(JSON.stringify({
        type: "turn",
        message: `Turn is over`,
      }));
    }

  }


  return (
    <>
    {!props.spy&&props.red===props.redTurn&&!props.spyTurn ?
                  <div
                  className='article'
                  //style={{backgroundImage: `url(${cardLogo})`}}
                  style={{backgroundColor: `${props.color}`}}
                  >
                    <button
                    onClick={handleClick}
                    className='wordCard'
                    style={{color: `white`, backgroundColor: `${buttonColor}`, fontSize:`${260/props.randomWord.length}px`}}>
                    {buttonContent}
                    </button>
                  </div>
          
          :
          
          <div
          className='article'
          style={{backgroundColor: `${props.color}`}}
          >
            <div
                  className='wordCard'
                  style={{color: `white`, backgroundColor: `${buttonColor}`}}    
            >
              <h1 style={{marginBottom:"0px",fontSize:`${260/props.randomWord.length}px`, color:"white", fontWeight:"800"}}>{buttonContent}</h1>
            </div>
          </div>  
          } 
    </>
  )
}

export default CardWithWord