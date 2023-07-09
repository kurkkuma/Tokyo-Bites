import React from "react";
import Reviews from "./reviews/Reviews";
import Feedback from "./feedback/Feedback";
import Footer from "./footer/Footer";

function About() {
  return (
    <>
      <div className="about">
        <div className="info">
          <h1 className="title">Sushi bar "Tokyo Bites"</h1>
          <p className="text1">
            Welcome to Tokyo Bites, a cozy place where you can enjoy authentic
            Japanese sushi and other gourmet Asian dishes. We are proud to offer
            fresh and quality ingredients, prepared with the skill of our
            experienced chefs.
          </p>
          <p className="text2">
            At Tokyo Bites, you will experience the atmosphere of Tokyo, a
            modern and vibrant city where tradition meets modernity. Our
            interior combines modern and Japanese design elements to create a
            unique space ideal for relaxing lunches and dinners with friends and
            family.
          </p>
          <div className="contacts">
            <div className="phone-numbers">
              <p className="title">Phone numbers:</p>
              <div className="numbers">
                <p className="number">+1 555-123-4567</p>
                <p className="number">+44 20 1234 5678</p>
              </div>
            </div>
            <div className="social-media">
              <p className="title">Social media:</p>
              <div className="icons">
                <img src="/images/icons/telegram.png" alt="telegram-icon" />
                <img src="/images/icons/instagram.png" alt="instagram-icon" />
                <img src="/images/icons/facebook.png" alt="facebook-icon" />
              </div>
            </div>
            <div className="google-map">
              <p className="title">Google map:</p>
              <img src="/images/icons/map.png" alt="map-icon" />
            </div>
          </div>
        </div>
        <img
          className="about-img"
          src="/images/about-img.png"
          alt="about-image"
        />
      </div>
      <Reviews />
      <Feedback />
      <Footer />
    </>
  );
}

export default About;
