import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop id="video-background">
          <source src="/video/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text">
          <h1>Welcome to SkyHub</h1>
          <p>Your gateway to seamless and enjoyable travel experiences</p>
          <a href='/about'><button className="cta-button">Learn More</button></a>
        </div>
      </section>

      {/* Featured Airlines Section */}
      <section className="featured-airlines">
        <h2>Featured Airlines</h2>
        <div className="airline">
          <img src="/images/Airlines/Emirates-Airlines.jpg" alt="Emirates Airlines" />
          <h3>Emirates Airlines</h3>
          <p>Connecting you to the world with luxury and comfort.</p>
        </div>
        <div className="airline">
          <img src="/images/Airlines/Singapore_Airlines.jpg" alt="Singapore Airlines" />
          <h3>Singapore Airlines</h3>
          <p>Air travel, offering exceptional service and hospitality.</p>
        </div>
        <div className="airline">
          <img src="/images/Airlines/delta.jpg" alt="Delta Air Lines" />
          <h3>Delta Air Lines</h3>
          <p>Experience the world with Delta Air Lines.</p>
        </div>
        <div className="airline">
          <img src="/images/Airlines/British-Airways.webp" alt="British Airways" />
          <h3>British Airways</h3>
          <p>Fly with elegance and sophistication on British Airways.</p>
        </div>
        <div className="airline">
          <img src="/images/Airlines/lufthansa.jpg" alt="Lufthansa" />
          <h3>Lufthansa</h3>
          <p>German precision and hospitality with Lufthansa.</p>
        </div>
        <div className="airline">
          <img src="/images/Airlines/Qatar-airways.jpg" alt="Qatar Airways" />
          <h3>Qatar Airways</h3>
          <p>World-class service and hospitality with Qatar Airways.</p>
        </div>
      </section>

      {/* Deals and Promotions Section */}
      <section className="deals-and-promotions">
        <h2>Deals and Promotions</h2>
        <div className="deal">
          <img src="/images/Deals/hotel.webp" alt="Beach Getaway Deal" />
          <h3>Beach Getaway Deal</h3>
          <p>Escape to a tropical paradise with our Beach Getaway Deal. Hurry, limited time offer!</p>
          <p><strong>Valid until: August 31, 2024</strong></p>
          <a href="#" className="deal-link">Learn More</a>
        </div>
        <div className="deal">
          <img src="/images/Deals/mountain.jpg" alt="Mountain Adventure Deal" />
          <h3>Mountain Adventure Deal</h3>
          <p>Embark on a thrilling adventure with our Mountain Adventure Deal.</p>
          <p><strong>Valid until: September 15, 2024</strong></p>
          <a href="#" className="deal-link">Learn More</a>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destination">
          <img src="/images/Destinations/Tokyo.jpg" alt="Tokyo, Japan" />
          <h3>Tokyo, Japan</h3>
          <p>Experience the vibrant culture of Tokyo, Japan.</p>
        </div>
        <div className="destination">
          <img src="/images/Destinations/new-york.jpg" alt="New York, USA" />
          <h3>New York, USA</h3>
          <p>Discover the city that never sleeps.</p>
        </div>
        <div className="destination">
          <img src="/images/Destinations/sydney.jpg" alt="Sydney, Australia" />
          <h3>Sydney, Australia</h3>
          <p>Experience the stunning landscapes of Sydney, Australia. </p>
        </div>
        <div className="destination">
          <img src="/images/Destinations/Italy.jpg" alt="Rome, Italy" />
          <h3>Rome, Italy</h3>
          <p>Immerse yourself in the rich history of Rome, Italy. </p>
        </div>
        <div className="destination">
          <img src="/images/Destinations/greece.webp" alt="Santorini, Greece" />
          <h3>Santorini, Greece</h3>
          <p>Experience the breathtaking views of Santorini, Greece. </p>
        </div>
        <div className="destination">
          <img src="/images/Destinations/cape.jpg" alt="Cape Town, South Africa" />
          <h3>Cape Town, South Africa</h3>
          <p>Discover the diverse landscapes of Cape Town.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

