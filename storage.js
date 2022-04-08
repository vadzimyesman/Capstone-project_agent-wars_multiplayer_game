// import BestPlayers from './BestPlayers'
// import LoginRegisterForms from './LoginRegisterForms'
// import Play from './Play'


// {navBarStatus && <ul>
//     <Link to="/play" ><li>Play</li></Link>
//     <Link to="/best" ><li>Best players</li></Link>
//  </ul>}

//  <Routes>
//    <Route path = "/play" element = {<Play />} />
//    <Route path = "/best" element = {<BestPlayers />} />
//  </Routes>

//    <button
//    onClick={()=>{
//      navigate("")
//    }}
//    >click me</button>


        // create table messages (
        //   message_id serial primary key, 
        //   message varchar(30)
        // );     http://localhost:4444

        // drop table if exists messages;
        // create table messages (
        //     message_id serial primary key, 
        //     message varchar(30),
        //     nickname varchar(30)
        //   ); 

        //"start": "node ./server/index.js && npm build",
        //"proxy":"http://localhost:4000",

        //https://random-word-api.herokuapp.com/word?number=10&swear=0
        //"start": "react-scripts start",

        // create table words (
        //         word_id serial primary key, 
        //         word varchar(30),
        //         color varchar(30),
        //         index integer
        //       ); 

        // Create table turns(
        //         turn_id serial primary key,
        //         red boolean,
        //         spy boolean
        //         )

        // create table clues (
        //         clue_id serial primary key, 
        //         clue varchar(30),
        //         numberOfWords integer,
        //         nickname varchar(30),
        //         red boolean
        //       ); 

        // axios.post(`/api/newWords`,res.data )
        // .then(res=>{
        //   console.log(res.data+"222222222222222222222222222222222222222")
        //   setBlue(res.data.blue)
        //   setRed(res.data.red)
        //   setGrey(res.data.grey)
        //   setBlack(res.data.black)
        //   setBlueLeft(res.data.blueLeft.length)
        //   setRedLeft(res.data.redLeft.length)
        //   if(res.data.red.length===9){
        //     setRedTurn(true)
        //     setSpyTurn(true)
        //   } else {
        //     axios.get("api/nextTurn")
        //     .then(res=>console.log(res.data))
        //     .catch(err=>console.log(err))
        //     setRedTurn(false)
        //     setSpyTurn(true)
        //   }
        //   client.send(JSON.stringify({
        //     type: "newCards",
        //     message: "Admin got new cards!",
        //     nickname: "Game"
        //   }));
        // })
        // .catch(err=>console.log(err))