interface ReviewCardProps {
  userName: string;
  date: string;
  stars: number;
  text: string;
}

function ReviewCard({ userName, date, stars, text }: ReviewCardProps) {
  return (
    <div className="review-card">
      <div className="review-container">
        <div className="header">
          <img src="/images/icons/avatar-light.png" alt="avatar" />
          <div className="review-info">
            <p className="name">{userName}</p>
            <p className="date">{date}</p>
          </div>
        </div>
        <p className="stars">{"★".repeat(stars)}</p>
        <p className="review-text">{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
