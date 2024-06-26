import React from "react";

const ReviewList = ({ reviews, deleteReview, startEditReview }) => {
    return (
        <div id="reviews-container" className="reviews-grid">
            {reviews.map((review, index) => (
                <div key={index} className="review-card">
                    {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} className="star" style={{ color: "var(--primary-color)", fontSize: "25px" }}>
                            ★
                        </span>
                    ))}
                    <br />
                    {review.comment}
                    <br />
                    <br />
                    {new Date(review.timestamp).toLocaleDateString()}
                    <br />
                    <button onClick={() => startEditReview(index)} className="edit-review-button">
                        Edit
                    </button>
                    <button onClick={() => deleteReview(index)} className="delete-review-button">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;