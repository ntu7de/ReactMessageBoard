import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/MessageBoard.css'
import Message from './Message'

const MessageBoard = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [allData, setAllData] = useState([]);

    // CRUD: Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: username,
            message: message,
        }
        try {
            const response = await axios.post('http://localhost:8000/messages', body);
            // console.log('update response', response);
            
            // Update allData state:
            setAllData(prevData => [...prevData, { id: response.data.id, ...body }]);

            // Clear input fields after submit
            setMessage("");
            setUsername("");
        } catch (error) {
            console.log("Error submitting message: ", error);
        }
    }

    // CRUD: Read
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/messages");
            // console.log('response', response.data);
            setAllData(response.data);
        } catch (error) {
            console.log("Error fetching messages: ", error)
        }
    }    

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h2>Welcome to your message board!</h2>
            <div className='input-container'>
                <form onSubmit={handleSubmit}>
                    <p>What's your username?</p>
                    <input 
                        className='username-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    <p>Share your thoughts here: </p>
                    <input 
                        type='text' 
                        className='message-input'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}></input>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='previous-messages'>
                {allData ? allData.map((message, index) => {
                    return (
                        <div key={`${message.id}-${index}`}>
                            <Message message={message}></Message>
                        </div>
                    );
                }) : ''}
            </div>
        </>
    )
}

export default MessageBoard