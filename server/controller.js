require('dotenv').config()
const {DATABASE_URL} = process.env
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()
const Sequelize = require("sequelize")

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

  module.exports = {

      seedDataBase: (req,res)=>{
          sequelize.query(`
          drop table if exists passwords;
          drop table if exists nicknames;

          create table nicknames (
            nickname_id serial primary key, 
            nickname varchar(30)
          );

          create table passwords (
            password_id serial primary key, 
            password varchar(30),
            nickname_id INTEGER NOT NULL REFERENCES nicknames(nickname_id)
          );
          `)
          .then(() => {
          console.log('DB seeded!')
          res.sendStatus(200)
          })
          .catch(err => console.log('error seeding DB', err))
      },

      loginPart: (req,res)=>{
         let {nickname, password} = req.body
         console.log(nickname, password)
         sequelize.query(`
         SELECT * FROM nicknames
         JOIN passwords on nicknames.nickname_id=passwords.nickname_id
         WHERE nickname='${nickname}' AND password='${password}'
         `)
         .then(dbRes=>{
            //let response=true
            if (dbRes[0].length!==0){
                console.log(dbRes[0].length+"?????????????????")
                res.status(200).send(true)
            } else {
                console.log(dbRes[0].length+"&&&&&&&&&&&&&&&")
                res.status(200).send(false)
            }
            
         })
         .catch(err=>console.log(err.message+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"))
      },

      registerPart: (req,res)=>{
          let {nickname, password} =req.body
          console.log(nickname, password)
          sequelize.query(`
          SELECT * FROM nicknames
          WHERE nickname='${nickname}'
          `)
          .then(dbRes=>{
              console.log(dbRes[0]+"OOOOOOOOOOOOOOOOOOOOOOOOOOOO")
              if (dbRes[0].length!==0){
                res.status(200).send(false)
              } else {
                  sequelize.query(`
                  INSERT INTO nicknames (nickname)
                  VALUES ('${nickname}')
                  `)
                  sequelize.query(`
                  SELECT nickname_id FROM nicknames
                  WHERE nickname='${nickname}'
                  `)
                  .then((dbRes)=>{
                    sequelize.query(`
                    INSERT INTO passwords (password, nickname_id)
                    VALUES ('${password}',${dbRes[0][0].nickname_id})
                    `)
                  })
                  .catch(err=>console.log(err))

                res.status(200).send(true)
              }
          })
      },


      postMessage: (req,res) =>{
        let {message,nickname}=req.body
        console.log(message)
        sequelize.query(`
        INSERT INTO messages (message, nickname)
        VALUES ('${message}', '${nickname}');
        SELECT * FROM messages
        `)
        .then(dbRes=>{

          console.log(dbRes[0])
          res.status(200).send(dbRes[0])
        })
        .catch(err=>console.log(err))
      },


      showAllPosts: (req,res) =>{
        sequelize.query(`
        SELECT message, nickname FROM messages
        `)
        .then(dbRes=>{
          console.log(dbRes[0])
          res.status(200).send(dbRes[0])
        })
        .catch(err=>console.log(err))
      },

      startNewGame: (req,res) =>{
        let {nickname}=req.body
        console.log(nickname)
        sequelize.query(`
        INSERT INTO admin (nickname)
        VALUES ('${nickname}')
        `)
      },



      adminCheck: (req,res) =>{
        sequelize.query(`
        SELECT * FROM admin
        `)
        .then(dbRes=>{
          let data={
            adminExists:false,
            adminNickname:"no admin yet"
          }
          if(dbRes[0].length===1){
            console.log(`Admin is ${dbRes[0][0].nickname}`)
            data.adminExists=true
            data.adminNickname=dbRes[0][0].nickname
            res.status(200).send(data)
          } else {
            console.log(`Admin is no admin yet!`)
            res.status(200).send(data)
          }
        })
      },


      killGame: (req,res) =>{
        sequelize.query(`
        DROP TABLE admin;
        CREATE TABLE admin (
          admin_id serial primary key,
          nickname varchar(30)
        );
        DROP TABLE messages;
        CREATE TABLE messages (
          message_id serial primary key, 
          message varchar(30),
          nickname varchar(30)
        ); 
        DROP TABLE players;
        CREATE TABLE players(
          player_id SERIAL PRIMARY KEY,
          nickname varchar(30),
          red boolean,
          spy boolean
          );
          DROP TABLE words;
          CREATE TABLE words (
            word_id serial primary key, 
            word varchar(30),
            color varchar(30),
            index integer,
            open boolean
          ); 
          DROP TABLE turns;
          Create table turns(
            turn_id serial primary key,
            red boolean,
            spy boolean
            );
          INSERT INTO turns (red,spy)
          VALUES (true,true)
        `)
        res.status(200).send("Game killed")
      },

      redSpy: (req,res) =>{
        let {nickname}=req.body
        sequelize.query(`
        INSERT INTO players (nickname,red,spy)
        VALUES ('${nickname}', 'true','true');
        SELECT * FROM players
        `)
        .then((dbRes)=>{
          console.log(dbRes[0])
          resObject={
            redSpy : "",
            redAgents : [],
            blueSpy : "",
            blueAgents : []
          }

          dbRes[0].map((element)=>{
            if (element.red){
              if (element.spy){
                resObject.redSpy=element.nickname
              } else {
                resObject.redAgents.push(element.nickname+" ")
              }
            } else {
              if (element.spy){
                resObject.blueSpy=element.nickname
              } else {
                resObject.blueAgents.push(element.nickname+" ")
              }
            }

        })
          res.status(200).send(resObject)
        })
        
      },

      
      
      blueSpy: (req,res) =>{
        let {nickname}=req.body
        sequelize.query(`
        INSERT INTO players (nickname,red,spy)
        VALUES ('${nickname}', 'false','true');
        SELECT * FROM players
        `)
        .then((dbRes)=>{
          console.log(dbRes[0])
          resObject={
            redSpy : "",
            redAgents : [],
            blueSpy : "",
            blueAgents : []
          }

          dbRes[0].map((element)=>{
            if (element.red){
              if (element.spy){
                resObject.redSpy=element.nickname
              } else {
                resObject.redAgents.push(element.nickname+" ")
              }
            } else {
              if (element.spy){
                resObject.blueSpy=element.nickname
              } else {
                resObject.blueAgents.push(element.nickname+" ")
              }
            }

        })
          res.status(200).send(resObject)
        })
        
      },

      
      
      redAgent: (req,res)=>{
        let {nickname}=req.body
        sequelize.query(`
        INSERT INTO players (nickname,red,spy)
        VALUES ('${nickname}', 'true','false');
        SELECT * FROM players
        `)
        .then((dbRes)=>{
          console.log(dbRes[0])
          resObject={
            redSpy : "",
            redAgents : [],
            blueSpy : "",
            blueAgents : []
          }

          dbRes[0].map((element)=>{
            if (element.red){
              if (element.spy){
                resObject.redSpy=element.nickname
              } else {
                resObject.redAgents.push(element.nickname+" ")
              }
            } else {
              if (element.spy){
                resObject.blueSpy=element.nickname
              } else {
                resObject.blueAgents.push(element.nickname+" ")
              }
            }

        })
          res.status(200).send(resObject)
        })
        
      },

      
      
      blueAgent: (req,res)=>{
        let {nickname}=req.body
        sequelize.query(`
        INSERT INTO players (nickname,red,spy)
        VALUES ('${nickname}', 'false','false');
        SELECT * FROM players
        `)
        .then((dbRes)=>{
          console.log(dbRes[0])
          resObject={
            redSpy : "",
            redAgents : [],
            blueSpy : "",
            blueAgents : []
          }

          dbRes[0].map((element)=>{
            if (element.red){
              if (element.spy){
                resObject.redSpy=element.nickname
              } else {
                resObject.redAgents.push(element.nickname+" ")
              }
            } else {
              if (element.spy){
                resObject.blueSpy=element.nickname
              } else {
                resObject.blueAgents.push(element.nickname+" ")
              }
            }

        })
          res.status(200).send(resObject)
        })
        
      }, 
      
      
      
      showTeams: (req,res)=>{
        sequelize.query(`
        SELECT * from players
        WHERE player_id=1
        `)
        .then(dbRes=>{
          if (dbRes[0].length!==0){
            sequelize.query(`
            SELECT * FROM players
            `)
            .then((dbRes)=>{
              console.log(dbRes[0])
              resObject={
                redSpy : "",
                redAgents : [],
                blueSpy : "",
                blueAgents : [],
                allPlayers : []
              }
    
              dbRes[0].map((element)=>{
                if (element.red){
                  if (element.spy){
                    resObject.redSpy=element.nickname
                  } else {
                    resObject.redAgents.push(element.nickname+" ")
                  }
                } else {
                  if (element.spy){
                    resObject.blueSpy=element.nickname
                  } else {
                    resObject.blueAgents.push(element.nickname+" ")
                  }
                }
                resObject.allPlayers.push(element.nickname)
            })
              res.status(200).send(resObject)
            })
          }  else{
                resObject={
                  redSpy : "",
                  redAgents : [],
                  blueSpy : "",
                  blueAgents : [],
                  allPlayers : []
                }
                res.status(200).send(resObject)
          }
        })
        
      },


      newWords: (req,res)=>{
        console.log("newWords has ran")
        console.log(req.body+"NNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
        
      let coin = Math.floor(Math.random()*2+1)
        console.log(`coin is ${coin}`)
        let randomIndex = new Set()
      
        
          while (randomIndex.size < 25){
          
            randomIndex.add(Math.floor(Math.random()*25))
        } 
          console.log(randomIndex)
          let randomArr = [...randomIndex]
          if (coin===1){
            sequelize.query(`
            UPDATE turns
            SET red=true , spy=true
            WHERE turn_id=1
            `)
            let redArr= randomArr.splice(0,9)
            let blueArr=randomArr.splice(0,8)
            let greyArr = randomArr.splice(0,7)
            let blackArr = randomArr[0]
            console.log(redArr,blueArr,greyArr,blackArr)
            sequelize.query(`
            DROP TABLE words;
            CREATE TABLE words (
              word_id serial primary key, 
              word varchar(30),
              color varchar(30),
              index integer,
              open boolean
            ); 
            `)
            req.body.map((word,index)=>{
              let color = ""
              if (redArr.includes(index)){
                color="red"
              } else if (blueArr.includes(index)) {
                color="blue"
              } else if (greyArr.includes(index)){
                color="grey"
              } else {
                color="black"
              }
              sequelize.query(`
              INSERT INTO words (word,color,index,open)
              VALUES ('${word}','${color}',${index},FALSE);
              `)
            })
            let object = {
              red: redArr,
              blue: blueArr,
              grey: greyArr,
              black: blackArr,
              redLeft: redArr.length,
              blueLeft: blueArr.length
            }
            res.status(200).send(object)
          } else {
            sequelize.query(`
            UPDATE turns
            SET red=false, spy=true
            WHERE turn_id=1
            `)
            let redArr= randomArr.splice(0,8)
            let blueArr=randomArr.splice(0,9)
            let greyArr = randomArr.splice(0,7)
            let blackArr = randomArr[0]
            
            console.log(redArr,blueArr,greyArr,blackArr)
            sequelize.query(`
            DROP TABLE words;
            CREATE TABLE words (
              word_id serial primary key, 
              word varchar(30),
              color varchar(30),
              index integer,
              open boolean
            ); 
            `)
            req.body.map((word,index)=>{
              let color = ""
              if (redArr.includes(index)){
                color="red"
              } else if (blueArr.includes(index)) {
                color="blue"
              } else if (greyArr.includes(index)){
                color="grey"
              } else {
                color="black"
              }
              sequelize.query(`
              INSERT INTO words (word,color,index,open)
              VALUES ('${word}','${color}',${index},FALSE);
              `)
            })
            let object = {
              red: redArr,
              blue: blueArr,
              grey: greyArr,
              black: blackArr,
              redLeft: redArr,
              blueLeft: blueArr
            }
            res.status(200).send(object)
          }
          
      },



      showCards : (req,res)=>{

        sequelize.query(`
        SELECT * FROM words
        ORDER BY index
        `)
        .then(dbRes1=>{
          let object2 = {
            red: [],
            blue: [],
            grey: [],
            black: "",
            words : [],
            open: [],
            redLeft : [],
            blueLeft: [],
            redTurn: null,
            spyTurn: null
  
          }
          console.log(dbRes1[0])
          console.log("showCards has ran")
          dbRes1[0].map((object)=>{
            if (object.color==="red"){
              object2.red.push(object.index)
              if(!object.open){
                object2.redLeft.push(object.word)
              }
            }
            if (object.color==="blue"){
              object2.blue.push(object.index)
              if (!object.open){
                object2.blueLeft.push(object.word)
              }
            }
            if (object.color==="grey"){
              object2.grey.push(object.index)
            }
            if (object.color==="black"){
              object2.black=(object.index)
            }
            object2.words.push(object.word)
            if(object.open){
              object2.open.push(object.index)
            }
          })
          console.log(object2.words)
          res.status(200).send(object2)
        })
      },

      addOpening: (req,res)=>{
        let index = req.params.myParam
        console.log(`Just opened a card with index: ${index}`)
        sequelize.query(`
        UPDATE words
        SET open='true'
        WHERE index=${index}
        `)
      },

      newClue: (req,res)=>{
        const {nickname, clue, red, numberOfWords} = req.body
        let spyColor
        if (red){
          spyColor="Red"
        } else {
          spyColor="Blue"
        }
        sequelize.query(`
        UPDATE clues
        SET clue='${clue}', numberofwords=${numberOfWords}, nickname='${nickname}', red=${red}
        WHERE clue_id=1
        `)
        res.status(200).send(`{${spyColor} spy ${nickname} gave a clue ${clue} for ${numberOfWords} words`)
      },


      showTurn: (req,res)=>{
        sequelize.query(`
        SELECT * FROM turns
        `)
        .then(dbRes=>{
          console.log(dbRes[0])
          let object={
            red:dbRes[0][0].red,
            spy:dbRes[0][0].spy
          }
          console.log(object)
          res.status(200).send(object)
        })
      },

      nextTurn: (req,res)=>{
        sequelize.query(`
        SELECT * FROM turns
        `)
        .then(dbRes=>{
          console.log(dbRes[0][0])
          if (dbRes[0][0].spy){
            sequelize.query(`
            UPDATE turns
            SET spy=false
            WHERE turn_id=1
            `)
          } else {
            sequelize.query(`
            UPDATE turns
            SET spy=true, red=${!dbRes[0][0].red}
            WHERE turn_id=1
            `)
          }
          res.sendStatus(200)
        })
      },

      showClue: (req,res)=>{
        sequelize.query(`
        SELECT * FROM clues
        `)
        .then(dbRes=>{
          console.log(dbRes[0][0])
          object={
            clue: dbRes[0][0].clue,
            numberOfWords: dbRes[0][0].numberofwords,
            nickname: dbRes[0][0].nickname,
            red: dbRes[0][0].red
          }
          res.status(200).send(object)
        })
      }
  }
