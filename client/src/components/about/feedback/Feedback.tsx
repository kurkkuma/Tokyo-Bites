import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useAddReviewMutation } from "../../../store/api/reviewsApi";

import loading from "/images/loading.gif";

function Feedback() {
  const user = useAppSelector((state) => state.user.user);

  const [addReview, { isLoading, isError, isSuccess }] = useAddReviewMutation();

  const [reviewText, setReviewText] = useState<string>("");
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const [error, setError] = useState<string>("");

  const handleSendReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedStars) {
      const day = String(new Date().getDate()).padStart(2, "0");
      const month = String(new Date().getMonth() + 1).padStart(2, "0");
      const year = new Date().getFullYear();

      await addReview({
        userName: user.name,
        date: `${day}.${month}.${year}`,
        stars: selectedStars,
        text: reviewText,
      }).unwrap();
      setReviewText("");
      setError("");
    } else {
      setError("You must rate a star to submit a review.");
    }
  };

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
          <p className="name">{user.name}</p>
          <div className="rating">
            <div className="stars">
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-5"
                value="5"
                onChange={(e) => setSelectedStars(+e.target.value)}
              />
              <label className="star-label" htmlFor="star-5"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-4"
                value="4"
                onChange={(e) => setSelectedStars(+e.target.value)}
              />
              <label className="star-label" htmlFor="star-4"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-3"
                value="3"
                onChange={(e) => setSelectedStars(+e.target.value)}
              />
              <label className="star-label" htmlFor="star-3"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-2"
                value="2"
                onChange={(e) => setSelectedStars(+e.target.value)}
              />
              <label className="star-label" htmlFor="star-2"></label>
              <input
                className="star"
                type="radio"
                name="rating"
                id="star-1"
                value="1"
                onChange={(e) => setSelectedStars(+e.target.value)}
              />
              <label className="star-label" htmlFor="star-1"></label>
            </div>
          </div>
        </div>
        <form>
          <div className="textarea-container">
            <textarea
              maxLength={349}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review"
            ></textarea>
          </div>

          <button onClick={handleSendReview} className="btn">
            SEND
          </button>
          <br />
          {isSuccess && <p className="success">Success!</p>}
          {isLoading && (
            <img src={loading} style={{ width: "2rem", height: "2rem" }} />
          )}

          {isError && <p className="error">Error</p>}
          {error && (
            <p className="warning">You must rate a star to submit a review.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Feedback;
