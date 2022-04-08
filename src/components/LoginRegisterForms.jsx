import React, { useState } from 'react'
import axios from 'axios'
import Lobby from './Lobby'

function LoginRegisterForms() {

    const [input1,setInput1]=useState("")
    const [input2,setInput2]=useState("")
    const [input3,setInput3]=useState("")
    const [input4,setInput4]=useState("")
    const [input5,setInput5]=useState("")
    const [nickname, setNickname]=useState("")
    const [loginFormStatus, setLoginFormStatus]=useState(true)
    const [registerFormStatus, setregisterFormStatus]=useState(false)
    const [lobbyStatus, setLobbyStatus]=useState(false)
    const [loginErrorStatus, setLoginErrorStatus]=useState(false)
    const [nicknameError, setNicknameError]=useState(false)
    const [passwordError, setPasswordError]=useState(false)
    const [adminStatus, setAdminStatus]=useState(false)
    const [adminName, setAdminName]=useState("")

    const handleClick1 = (event) =>{
        
        setInput1("")
        setInput2("")
        event.preventDefault()
        
        const body={
            nickname:input1,
            password:input2
        }
        axios.post(`/api/login`,body)
        .then((res)=>{
            console.log(res.data)
            if (res.data){
                adminExists()
                setLobbyStatus(true)
                setLoginFormStatus(false)
                setNickname(input1)          
            } else {
                setLoginErrorStatus(true)
            }
        })

    }

    const handleClick2 = () =>{
        setLoginFormStatus(false)
        setregisterFormStatus(true)
    }

    const handleClick3 = (event) =>{

        setPasswordError(false)
        event.preventDefault()
        if (input4===input5){
            let body={
                nickname:input3,
                password:input4
            }
            axios.post(`/api/register`,body)
            .then(res=>{
                if (res.data){
                    adminExists()
                    console.log(res.data)
                    setLobbyStatus(true)
                    setregisterFormStatus(false)
                    setNickname(input3)
                } else {
                    setNicknameError(true)
                }
            })

        } else {
            setPasswordError(true)
            setInput4("")
            setInput5("")
        }      
    }

 const adminExists = ()=>{
     axios.get(`/api/adminCheck`)
     .then(res=>{
        console.log(res.data)
        setAdminStatus(res.data.adminExists)
        setAdminName(res.data.adminNickname)
     })
     .catch(err=>console.log(err))
 }

  return (
    <div className='loginFormDiv'>
        {loginFormStatus && <form 
        style={{marginTop:"30px"}}
        className='loginForm'>
            <div style={{display:"flex"}}>
                <h3
                style={{color:"white",marginBottom:"20px", marginLeft:"15px", marginRight:"5px"}}
                >Existing player?</h3>
                <button
                style={{width:"70px",height:"30px",borderRadius:"10px"}}
                onClick={handleClick1}
                >Log in</button>
            </div>
            
            <input
            style={{borderRadius:"10px", marginLeft:"15px"}}
            value={input1}
            onChange={e=>{
                setInput1(e.target.value)
            }}
            placeholder='Nickname:'
            ></input>
                        
            <br/>
            <input
            type="password"
            style={{marginTop:"5px", marginLeft:"15px", borderRadius:"10px"}}
            value={input2}
            onChange={e=>{
                setInput2(e.target.value)
            }}
            placeholder='Password:'
            ></input>

            <div style={{display:"flex", marginTop:"18px"}}>
            <h3 
            style={{color:"white", marginLeft:"18px", marginRight:"25px"}}
            >New player?</h3>
            <button
            style={{width:"70px",height:"30px", borderRadius:"10px"}}
            onClick={handleClick2}
            >Register</button>
            </div>
            {loginErrorStatus && <h3
            style={{color:"white", marginLeft:"20px"}}
            >Wrong nickname or password!</h3>}

            </form>}

            {registerFormStatus &&<form className='registerForm'
            style={{marginTop:"30px", marginLeft:"15px"}}
            >
            <input
            style={{borderRadius:"10px", marginBottom:"15px"}}
            value={input3}
            placeholder='Nickname'
            onChange={e=>{
                setInput3(e.target.value)
            }}
            >
            </input>
            <input
            style={{borderRadius:"10px", marginBottom:"15px"}}
            value={input4}
            type="password"
            placeholder='Password'
            onChange={e=>{
                setInput4(e.target.value)
            }}
            >
            </input>
            <input
            style={{borderRadius:"10px", marginBottom:"15px"}}
            value={input5}
            type="password"
            placeholder='Confirm password'
            onChange={e=>{
                setInput5(e.target.value)
            }}
            >
            </input>
            <button
            style={{borderRadius:"10px", width:"70px", height:"30px", marginLeft:"55px"}}
            onClick={handleClick3}
            >Submit</button>
            {nicknameError && <h3 style={{color:"white"}}>Nickname is already taken!</h3>}
            {passwordError && <h3 style={{color:"white"}}>Passwords did not match!</h3>}
        </form>}

        {lobbyStatus && <Lobby  nickname={nickname} adminName={adminName} adminStatus={adminStatus}/>}
    </div>
  )
}

export default LoginRegisterForms