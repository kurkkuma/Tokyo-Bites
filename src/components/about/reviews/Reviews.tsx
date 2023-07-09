import React from "react";
import ReviewCard from "./review-card/ReviewCard";

function Reviews() {
  return (
    <div className="reviews">
      <h1 className="title">feedback from our customers</h1>
      <div className="container">
        <img src="/images/icons/arrow-left.png" alt="arrow" />
        <div className="reviews-container">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <img src="/images/icons/arrow-right.png" alt="arrow" />
      </div>
    </div>
  );
}

export default Reviews;
