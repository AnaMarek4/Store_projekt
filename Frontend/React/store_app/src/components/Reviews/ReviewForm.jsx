import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ addReview, editReview, editMode, reviewToEdit, setEditMode }) => {
    const [rating, setRating] = useState(reviewToEdit ? reviewToEdit.rating : 0);
    const [comment, setComment] = useState(reviewToEdit ? reviewToEdit.comment : "");

    useEffect(() => {
        if (editMode && reviewToEdit) {
            setRating(reviewToEdit.rating);
            setComment(reviewToEdit.comment);
        }
    }, [editMode, reviewToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && comment) {
            const review = {
                rating,
                comment,
                timestamp: reviewToEdit ? reviewToEdit.timestamp : new Date().toISOString(),
            };
            if (editMode) {
                editReview(reviewToEdit.index, review);
            } else {
                addReview(review);
            }
            setRating(0);
            setComment("");
            setEditMode(false);
        }
    };

    const handleCancelEdit = () => {
        setRating(0);
        setComment("");
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Rating:</label>
                <StarRating rating={rating} setRating={setRating} />
                <input type="hidden" value={rating} required />
            </div>
            <div className="form-group">
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" className="submit-review-button" disabled={rating === 0}>
                {editMode ? "Update review" : "Submit review"}
            </button>
            {editMode && (
                <button type="button" onClick={handleCancelEdit} className="cancel-edit-button">
                    Cancel
                </button>
            )}
        </form>
    );
};

export default ReviewForm;