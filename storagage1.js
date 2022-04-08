// //old lobby
// // import axios from 'axios'
// // import React, { useState } from 'react'
// // import CardWithWord from './CardWithWord'
// // import Chat from './Chat'
// // import RandomWords from './RandomWords'




// // function Lobby(props) {

// //   const [display1,setDisplay1]=useState(true)
// //   const [display2,setDisplay2]=useState(false)
// //   const [display3,setDisplay3]=useState(false)
//   const [randomWords, setRandomWords]=useState([])


// //   const handleClick1 = () =>{
// //     setDisplay1(false)
// //     setDisplay2(true)
// //   }

//   const handleClick2 = () =>{
//     //setDisplay1(false)
    
//     let array2=[]
//     for (let i=1;i<=25;i++){
//             axios.get(`https://random-word-form.herokuapp.com/random/noun`)
//       .then(res=>{
//         console.log(res.data[0])
//         array2.push(res.data[0])
//         i===25 && setRandomWords(array2)
//         //console.log(array2)   
//       }) 
//     }



// //     console.log(array2)
    
// //     setDisplay3(true)
    
// //   }

  
  
//   let listOfWords = randomWords.map((element,index)=>{
//     return < CardWithWord key={index} randomWord={element} />
//   })

// //   // let messagesToDisplay = posts
// //   // .map((element,index)=>{
// //   //     return <MessagePost key={index} nickname={element.nickname} message={element.message}/>
// //   // })

// //   return (
    
// //     <>

// //     {display1 && <div>
// //       <h1>Welcome, {props.nickname+"!"}</h1>
// //       <div>
// //         <button
// //         onClick={handleClick1}
// //         >Join chat</button>
// //       </div>
// //       <button
// //       onClick={handleClick2}
// //       >Get random words</button>
// //     </div>}
// //     {display2 && <Chat nickname={props.nickname}/>}
// //     {display3 && <div className='divWithCards'>{listOfWords}</div>}
// //     </>
// //   )
// // }

// // export default Lobby


// // create table players(
// //     player_id SERIAL PRIMARY KEY,
// //     nickname varchar(30),
// //     red boolean,
// //     spy boolean
// //     )