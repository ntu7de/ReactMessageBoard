import React from 'react'

const Message = ({ message }) => {

    return (
        <>
            <p><b>{message.username}</b></p>
            <p>{message.message}</p> 
        </>
    )
}

export default Message