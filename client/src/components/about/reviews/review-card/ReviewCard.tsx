import { useDeleteReviewMutation } from "../../../../store/api/reviewsApi";

interface ReviewCardProps {
  id: string;
  userName: string;
  date: string;
  stars: number;
  text: string;
  deleteSign: boolean;
}

function ReviewCard({
  id,
  userName,
  date,
  stars,
  text,
  deleteSign,
}: ReviewCardProps) {
  const [deleteReviewApi] = useDeleteReviewMutation();

  const handleDelteReview = async () => {
    try {
      await deleteReviewApi({ reviewId: id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="review-card">
      <div className="review-container">
        <div className="header">
          <img src="/images/icons/avatar-light.png" alt="avatar" />
          <div className="review-info">
            <p className="name">{userName}</p>
            <p className="date">{date}</p>
          </div>
          {deleteSign && (
            <p onClick={handleDelteReview} className="delete-sign">
              x
            </p>
          )}
        </div>
        <p className="stars">{"★".repeat(stars)}</p>
        <p className="review-text">{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
