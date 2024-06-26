import React, { useState, useEffect } from "react";
import ReviewForm from "../components/Reviews/ReviewForm"; 
import ReviewList from "../components/Reviews/ReviewList";
import '../styles/reviews.css'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(storedReviews);
    }, []);

    const addReview = (review) => {
        const updatedReviews = [...reviews, review];
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    };

    const editReview = (index, updatedReview) => {
        const updatedReviews = reviews.map((review, i) =>
            i === index ? { ...updatedReview, index } : review
        );
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        setEditMode(false);
        setReviewToEdit(null);
    };

    const deleteReview = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    };

    const startEditReview = (index) => {
        setEditMode(true);
        setReviewToEdit({ ...reviews[index], index });
    };

    return (
        <div id="review-modal" className="modal">
            <div className="modal-content">
                <h1>Your review</h1>
                <ReviewForm
                    addReview={addReview}
                    editReview={editReview}
                    editMode={editMode}
                    reviewToEdit={reviewToEdit}
                    setEditMode={setEditMode}
                />
                <ReviewList
                    reviews={reviews}
                    deleteReview={deleteReview}
                    startEditReview={startEditReview}
                />
            </div>
        </div>
    );
};

export default Reviews;