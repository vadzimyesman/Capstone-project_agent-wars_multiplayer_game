import React from 'react'

function MessagePost(props) {
  return (
        <h3>{props.nickname}:{" "+props.message}</h3>
  )
}

export default MessagePost

