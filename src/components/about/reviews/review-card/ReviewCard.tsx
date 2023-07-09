import React from "react";

function ReviewCard() {
  return (
    <div className="review-card">
      <div className="review-container">
        <div className="header">
          <img src="/images/icons/avatar-light.png" alt="avatar" />
          <div className="review-info">
            <p className="name">Name Surname</p>
            <p className="date">05.07.2023</p>
          </div>
        </div>
        <p className="stars">★★★★★</p>
        <p className="review-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ipsa
          laudantium vero temporibus id eligendi esse obcaecati, porro cum!
          Eligendi voluptatem perferendis modi officiis.
        </p>
      </div>
      <p className="photo">No photos</p>
    </div>
  );
}

export default ReviewCard;
