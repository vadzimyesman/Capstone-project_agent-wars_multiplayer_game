import React from 'react'
import ChatTest from './ChatTest'
import Teams from './Teams'

function Game(props) {



    
  return (
    <div className='gamePage'>
        <div >
            <Teams 
            nickname={props.nickname} 
            admin={props.admin==='no admin yet'? props.nickname : props.admin}
            />
            
            
        </div>
        <ChatTest nickname={props.nickname}/>
    </div>

  )
}

export default Game