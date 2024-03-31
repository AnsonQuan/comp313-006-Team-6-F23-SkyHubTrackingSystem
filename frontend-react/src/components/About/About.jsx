import React from 'react';
import './About.css'; 
import Card from './Card'; 

const About = () => {
    return (
        <div className="about-page-container">
            <div className="card-row">
                <Card
                    imageSrc="/images/About/SKYHUB.jpg"
                    title="SkyHub"
                    text=" At SkyHub, we are on a mission to revolutionize the travel business by offering a creative and user-friendly
                    solution that goes beyond traditional reservation techniques. Our vision is to transform the travel industry
                    by providing a cutting-edge platform that redefines the way we plan and experience air travel."
                />
                <Card
                    imageSrc="/images/About/Our_Mission.jpg"
                    title="Our Mission"
                    text="Our mission is clear – to enhance the overall user experience by providing a feature-rich website that
                    ensures quick and easy account creation, secure login credentials, and simplified booking processes for
                    airline tickets, seats, and class types."
                />
            </div>
            <div className="card-row">
            <Card
    imageSrc="/images/About/Key_objectives.jpg"
    title="Key Objectives"
    text={
        <>
        
           <ul>
                                <li>User Experience Enhancement</li>
                                <li>Real-Time Flight Schedule Tracking</li>
                                <li>Analytics and Reporting</li>
                                <li>Cutting-Edge Technologies</li>
                                <li>Comprehensive Search and Filtering Options</li>
                                <li>Secure Payment Processing</li>
                                <li>Reliable Booking Management System</li>
                                <li>Efficient Customer Support</li>
                                <li>Integration with Global Airlines and Providers</li>
                                <li>Personalized Travel Recommendations</li>
          </ul>
        </>
    }
/>

                <Card
                    imageSrc="/images/About/Our_Vision.jpg"
                    title="Our Vision"
                    text=" SkyHub aspires to be a pioneer in the travel industry, setting new standards for convenience, efficiency,
                    and customer satisfaction. Through strategic partnerships with airlines and service providers, we aim to
                    build a dependable, adaptable, and user-friendly platform that elevates the travel planning experience."
                />
            </div>
            <div className="card-row center-row">
                <Card
                    imageSrc="/images/About/Join_us.jpg"
                    title="Join Us on the Journey"
                    text="SkyHub invites you to join us on this exciting journey to redefine travel. As we continue to grow and
                    evolve, we promise to remain dedicated to providing a platform that meets and exceeds your expectations."
                />
            </div>
        </div>
    );
};

export default About;
