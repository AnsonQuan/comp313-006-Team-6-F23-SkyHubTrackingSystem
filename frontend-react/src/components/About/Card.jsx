import React, { useState } from 'react';
import './About.css'; 

const Card = ({ imageSrc, title, text }) => {
    const [flipped, setFlipped] = useState(false);

    const flip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className={`card-container${flipped ? " flipped" : ""}`} onMouseEnter={flip} onMouseLeave={flip}>
            <Front imageSrc={imageSrc} title={title} />
            <Back text={text} />
        </div>
    );
};

const Front = ({ imageSrc, title }) => {
    return (
        <div className="front">
            <div className="image-container">
                <img className="card-image" src={imageSrc} alt="Card" />
                <h1 className="title">{title}</h1>
            </div>
        </div>
    );
};

const Back = ({ text }) => {
    return (
        <div className="back">
            <p>{text}</p>
        </div>
    );
};

export default Card;

