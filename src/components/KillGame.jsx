import React from 'react'
import axios from 'axios'

function KillGame() {

    const handleClick1 = () =>{
        axios.get(`/api/killGame`)
        .then(res=>window.location.reload(false))
        .catch(err=>console.log(err))
    }


  return (
    <div>
        <button
        style={{borderRadius:"15px"}}
            onClick={handleClick1}
            >End current game
        </button>
    </div>
  )
}

export default KillGame