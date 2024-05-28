import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/MessageBoard.css'
import Message from './Message'
import { Grid } from '@mui/material'

const MessageBoard = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [allData, setAllData] = useState([]);
    const [buttonMethods, setButtonMethods] = useState([]);

    // CRUD: Create
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
    
    const handleEdit = async (id, newMessage) => {
        try {
            const response = await axios.put(`http://localhost:8000/messages/${id}`, {
                message: newMessage,
            })
            // console.log('update response', response);
            fetchData();
        } catch (error) {
            console.log("Error updating post: ", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/messages/${id}`);
            // console.log('Delete response: ', response);
            fetchData();
        } catch (error) {
            console.log("Error deleting post: ", error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        setButtonMethods([handleEdit, handleDelete]);
        fetchData();
    }, [])

    return (
        <>
            <h2>Welcome to your message board!</h2>
            <Grid container
            alignItems='stretch'
            columnSpacing={2}
            rowSpacing={2}>
                <Grid item xs='auto' sm={3}/>
                <Grid item xs={12} sm={3}>
                    <div className='input-container'>
                        <form onSubmit={handleSubmit}>
                            <p>Username:</p>
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
                                    <Message message={message} buttonMethods={buttonMethods}></Message>
                                </div>
                            );
                        }) : ''}
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}/>
            </Grid>
        </>
    )
}

export default MessageBoard