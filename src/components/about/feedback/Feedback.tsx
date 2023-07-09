import React from "react";

function Feedback() {
  return (
    <div className="feedback">
      <h1 className="title">Leave your feedback</h1>
      <p className="text">
        Your opinion is of great importance to us! At Tokyo Bites, we strive to
        provide you with the best experience and enjoyment of our food. Your
        feedback will help us continue to improve and reach new heights.
      </p>
      <div className="feedback-form">
        <div className="user-info">
          <img
            className="avatar"
            src="/images/icons/avatar-light.png"
            alt="avatar"
          />
          <p className="name">Name Surname</p>
          <div className="rating">
            <div className="stars">
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-5"
                value="5"
              />
              <label className="star-label" htmlFor="star-5"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-4"
                value="5"
              />
              <label className="star-label" htmlFor="star-4"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-3"
                value="5"
              />
              <label className="star-label" htmlFor="star-3"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-2"
                value="5"
              />
              <label className="star-label" htmlFor="star-2"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-1"
                value="5"
              />
              <label className="star-label" htmlFor="star-1"></label>
            </div>
          </div>
        </div>
        <form>
          <div className="textarea-container">
            <textarea
              maxLength={349}
              name=""
              id=""
              placeholder="Write your review"
            ></textarea>
            <img
              className="clip"
              src="/images/icons/clip.png"
              alt="add-photo"
            />
          </div>
          <button className="btn">SEND</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
