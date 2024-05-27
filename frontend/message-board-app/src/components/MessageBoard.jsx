import { useState } from 'react'
import '../styles/MessageBoard.css'

const MessageBoard = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            message: message,
        }
        // add axios response
    }

    return (
        <>
            <h2>Welcome to your message board!</h2>
            {/* <div className='input-container'> */}
                <p>Share your thoughts here: </p>
                <input 
                    type='text' 
                    className='input'
                    onChange={(e) => setMessage(e.target.value)}></input>
                <br></br>
                <button type='submit'>Submit</button>
            {/* </div> */}
        </>
    )
}

export default MessageBoard