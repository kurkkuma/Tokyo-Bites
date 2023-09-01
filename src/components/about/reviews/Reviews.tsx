import React, { useState } from "react";
import ReviewCard from "./review-card/ReviewCard";
import { useGetReviewsQuery } from "../../../store/api/reviewsApi";

import loading from "/images/loading.gif";

interface ReviewType {
  _id: string;
  userName: string;
  date: string;
  stars: number;
  text: string;
}

function Reviews() {
  const { data = [], isLoading, isError, isSuccess } = useGetReviewsQuery({});
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrevArrow = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  const handleNextArrow = () => {
    if (activeIndex < data.length - 3) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="reviews">
      <h1 className="title">feedback from our customers</h1>
      <div className="container">
        <img
          onClick={handlePrevArrow}
          className="arrow-left"
          src="/images/icons/arrow-left.png"
          alt="arrow"
        />
        <div className="reviews-container">
          {/* {isSuccess && <p className="success">Success!</p>}
          {isLoading && (
            <img src={loading} style={{ width: "2rem", height: "2rem" }} />
          )}
          {isError && <p className="error">Error</p>} */}
          {data
            .slice(activeIndex, activeIndex + 3)
            .map((item: ReviewType, index: number) => {
              return (
                <ReviewCard
                  key={index}
                  userName={item.userName}
                  date={item.date}
                  stars={item.stars}
                  text={item.text}
                />
              );
            })}
        </div>
        <img
          onClick={handleNextArrow}
          className="arrow-right"
          src="/images/icons/arrow-right.png"
          alt="arrow"
        />
      </div>
    </div>
  );
}

export default Reviews;
