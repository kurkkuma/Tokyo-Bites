import { useState, useRef, useEffect } from "react";
import ReviewCard from "./review-card/ReviewCard";
import { useGetReviewsQuery } from "../../../store/api/reviewsApi";
import { useAppSelector } from "../../../store/hooks";

function Reviews() {
  const user = useAppSelector((state) => state.user.user);
  const { data = [] } = useGetReviewsQuery({});
  const [containerOffset, setContainerOffset] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>();
  const windowRef = useRef<HTMLDivElement | null>();

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

  const groupedData = [];
  for (let i = 0; i < sortedData.length; i += 3) {
    groupedData.push(sortedData.slice(i, i + 3));
  }

  useEffect(() => {
    const allowedWidths = [300, 600, 700, 900];
    const updateWindowWidth = () => {
      if (windowRef.current) {
        const currentWidth = windowRef.current.offsetWidth;
        if (allowedWidths.includes(currentWidth)) {
          setContainerOffset(0);
        }
        setWindowWidth(currentWidth);
      }
    };
    updateWindowWidth();

    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <div className="reviews">
      <h1 className="title">feedback from our customers</h1>
      <div className="container">
        <img
          onClick={() => {
            if (windowWidth) {
              containerOffset === 0
                ? ""
                : setContainerOffset(containerOffset + windowWidth);
            }
          }}
          className="arrow-left"
          src="/images/icons/arrow-left.png"
          alt="arrow"
        />
        <div className="reviews-container">
          <div className="window">
            <div
              ref={(element) => {
                if (element) {
                  windowRef.current = element;
                }
              }}
              style={{ transform: `translateX(${containerOffset}px)` }}
              className="groups-container"
            >
              {groupedData.map((group, groupIndex: number) => {
                return (
                  <div key={groupIndex} className="reviews-group">
                    {group.map((item, index) => {
                      return (
                        <ReviewCard
                          key={index}
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
            </div>
          </div>
        </div>
        <img
          onClick={() => {
            if (windowWidth) {
              containerOffset === -((groupedData.length - 1) * windowWidth)
                ? ""
                : setContainerOffset(containerOffset - windowWidth);
            }
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
