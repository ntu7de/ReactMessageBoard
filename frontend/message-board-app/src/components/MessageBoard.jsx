import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/MessageBoard.css'

const MessageBoard = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: username,
            message: message,
        }
        // add axios response
    }

    // CRUD: Read
    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/messages");
            console.log('response', response.data);
            setAllMessages(response.data);
        } catch (error) {
            console.log("Error fetching messages: ", error)
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <>
            <h2>Welcome to your message board!</h2>
            <div className='input-container'>
                <form onSubmit={handleSubmit}>
                    <p>What's your username?</p>
                    <input 
                        className='username-input'
                        onChange={(e) => setUsername(e.target.value)}></input>
                    <p>Share your thoughts here: </p>
                    <input 
                        type='text' 
                        className='message-input'
                        onChange={(e) => setMessage(e.target.value)}></input>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='previous-messages'>
                <p>Previous messages will go here.</p>
            </div>
        </>
    )
}

export default MessageBoard