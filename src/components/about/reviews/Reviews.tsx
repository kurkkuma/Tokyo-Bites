import { useState } from "react";
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
  const { data = [] } = useGetReviewsQuery({});
  const [containerOffset, setContainerOffset] = useState<number>(0);

  const groupedData = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedData.push(data.slice(i, i + 3));
  }

  return (
    <div className="reviews">
      <h1 className="title">feedback from our customers</h1>
      <div className="container">
        <img
          onClick={() => {
            containerOffset === 0
              ? ""
              : setContainerOffset(containerOffset + 900);
          }}
          className="arrow-left"
          src="/images/icons/arrow-left.png"
          alt="arrow"
        />
        <div className="reviews-container">
          <div className="window">
            <div
              style={{ transform: `translateX(${containerOffset}px)` }}
              className="groups-container"
            >
              {groupedData.map((group, groupIndex: number) => {
                return (
                  <div key={groupIndex} className="reviews-group">
                    {group.map((item: ReviewType, index: number) => {
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
                );
              })}
            </div>
          </div>
        </div>
        <img
          onClick={() => {
            containerOffset === -((groupedData.length - 1) * 900)
              ? ""
              : setContainerOffset(containerOffset - 900);
          }}
          className="arrow-right"
          src="/images/icons/arrow-right.png"
          alt="arrow"
        />
      </div>
    </div>
  );
}

export default Reviews;
