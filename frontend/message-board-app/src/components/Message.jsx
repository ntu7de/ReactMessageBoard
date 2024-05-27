import { useState } from 'react'

const Message = ({ message, buttonMethods }) => {

    const [hasClickedEdit, setHasClickedEdit] = useState(false);
    const [newMessage, setNewMessage] = useState(message.message);

    const handleEdit = () => {
        setHasClickedEdit(true);
    }

    const handleEditSubmit = () => {
        buttonMethods[0](message.id, newMessage);
        setHasClickedEdit(false);
    }

    return (
        <>
            <p><b>{message.username}</b></p>
            <p>{message.message}</p> 
            <button onClick={handleEdit}>Edit</button>
            {hasClickedEdit ? 
                <div>
                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <button onClick={handleEditSubmit}>Submit</button>
                </div>: ''}
            <button onClick={() => buttonMethods[1](message.id)}>Delete</button>
        </>
    )
}

export default Message