import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const [value, setValue] = useState("")
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    
    const SurpriseOptions = [
        "I want to go somewhere warm", 
        "I want to go somewhere cold", 
        "I want to go somewhere with a beach", 
        "I want to go somewhere with a mountain", 
        "I want to go somewhere with a city", 
        "I want to go somewhere with a forest"];
    
    const surprise = () => {
        const randomValue = SurpriseOptions[Math.floor(Math.random() * SurpriseOptions.length)];
        setValue(randomValue);
    }    

    const getResponse = async () => {
        if(!value) {
            setError("Please enter a message");
            return;
        }
        try
        {
            const options = {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({history: chatHistory, message: value})
            }
            const response = await fetch('http://localhost:5000/gemini', options);
            const data = await response.text()
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: "User",
                parts: value
            },
                {
                    role: "Assistant",
                    part: data
                }
            ]);
        }
        catch
        {
            console.log(error);
            setError("An error occurred");
        }
    }

    const clear = () => {
        setValue("");
        setChatHistory([]);
        setError("");
    }
    return (
            <div className="query">
                <p>How can I help you today?
                <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise Me</button>
                </p>
                <div className='input_container'>
                    <input
                        value={value}
                        type="text"
                        placeholder='"I want to go somewhere warm"'
                        onChange={(e) => setValue(e.target.value)}
                        />
                    {!error && <button onClick={getResponse}>Send</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>
                {error && <p className="error">{error}</p>}
                {chatHistory.map ((chatItem, _index) => <div className='search-results'>
                    <div key={""}>
                        <p className='answer'>{chatItem.role} : {chatItem.parts}</p>
                    </div>
                </div>)}
            </div>
    )
};

export default Chatbot;