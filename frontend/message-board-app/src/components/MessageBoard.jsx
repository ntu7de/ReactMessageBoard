import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/MessageBoard.css'

const MessageBoard = () => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            message: message,
        }
        // add axios response
    }

    // CRUD: Read
    const fetchMessages = async () => {
        const response = await axios.get("http://localhost:5005/messages");
        console.log('response', response.data);
        setAllMessages(response.data);
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <>
            <h2>Welcome to your message board!</h2>
            {/* <div className='input-container'> */}
            <form onSubmit={handleSubmit}>
                <p>Share your thoughts here: </p>
                <input 
                    type='text' 
                    className='input'
                    onChange={(e) => setMessage(e.target.value)}></input>
                <br></br>
                <button type='submit'>Submit</button>
            </form>
            {/* </div> */}
        </>
    )
}

export default MessageBoard