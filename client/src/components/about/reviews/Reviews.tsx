import { useState, useEffect } from "react";
import ReviewCard from "./review-card/ReviewCard";
import { useGetReviewsQuery } from "../../../store/api/reviewsApi";
import { useAppSelector } from "../../../store/hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Reviews() {
  const user = useAppSelector((state) => state.user.user);
  const { data = [] } = useGetReviewsQuery({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const sortedData = [...data].sort((a, b) => {
    const starsComparison = b.stars - a.stars;
    if (starsComparison !== 0) {
      return starsComparison;
    }

    if (a.text && !b.text) {
      return -1;
    } else if (!a.text && b.text) {
      return 1;
    } else {
      return 0;
    }
  });

  const updateGroupedData = () => {
    const newGroupedData = [];
    const itemsPerGroup = windowWidth > 700 ? 3 : windowWidth > 470 ? 2 : 1;

    for (let i = 0; i < sortedData.length; i += itemsPerGroup) {
      newGroupedData.push(sortedData.slice(i, i + itemsPerGroup));
    }

    return newGroupedData;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const groupedData = updateGroupedData();
  return (
    <div className="reviews">
      <div className="reviews-container">
        <h1 className="title">feedback from our customers</h1>

        {groupedData.length > 0 && (
          <Carousel
            width={
              windowWidth > 900
                ? 900
                : windowWidth > 700
                ? 700
                : windowWidth > 470
                ? 500
                : 250
            }
            showThumbs={false}
            showStatus={false}
          >
            {groupedData.map((group: any, groupIndex: number) => {
              return (
                <div key={groupIndex} className="reviews-group">
                  {group.map((item: any) => {
                    return (
                      <ReviewCard
                        key={item._id}
                        id={item._id}
                        userName={item.userName}
                        date={item.date}
                        stars={item.stars}
                        text={item.text}
                        deleteSign={user._id === item.userId ? true : false}
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default Reviews;
