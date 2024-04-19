import React, {useState} from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    
    const SurpriseOptions = [
        "I want to go somewhere warm", 
        "I want to go somewhere cold", 
        "I want to go somewhere with a beach", 
        "I want to go somewhere with a mountain", 
        "I want to go somewhere with a city", 
        "I want to go somewhere with a forest"];
    
    const surprise = () => {
        const randomValue = SurpriseOptions[Math.floor(Math.random() * SurpriseOptions.length)];
        setPrompt(randomValue);
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/gemini', { prompt });
          setResponse(res.data.text);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const clear = () => {
        setPrompt("");
        setResponse("");
    }
    return (
        <div>
          <h2>Welcome to your AI Travel Assistant!</h2>
          <h3>How can we help you today?</h3>
            <button onClick={surprise}>Surprise me!</button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              required
            />
            <button type="submit">Send</button>
            <button type="button" onClick={clear}>Clear</button>
          </form>
          {response && (
            <div>
              <h3>Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      );
    };

export default Chatbot;