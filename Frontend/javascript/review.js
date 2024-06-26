const reviewModal = document.getElementById('review-modal');
const reviewForm = document.getElementById("review-form");

const starRatingContainer = document.querySelector(".star-rating");
const starRatingInputs = starRatingContainer.querySelectorAll(".star");
const ratingInput = document.getElementById("review-rating");

const submitReviewButton = document.querySelector(".submit-review-button");
const reviewsContainer = document.getElementById("reviews-container");

let reviews = [];

function loadReviewsFromLocalStorage() {
    const reviewData = localStorage.getItem('reviews');
    return JSON.parse(reviewData) || []; 
}

function saveReviewToLocalStorage(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function updateStarRating(selectedRating) {
    starRatingInputs.forEach((star, index) => {
        if (index < selectedRating) {
            star.textContent = "★"; 
        } else {
            star.textContent = "☆"; 
        }
    });
}

starRatingContainer.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("star")) {
        const selectedRating = parseInt(e.target.getAttribute("data-rating"));
        updateStarRating(selectedRating);
    }
});

starRatingContainer.addEventListener("mouseout", () => {
    const selectedRating = parseInt(ratingInput.value);
    updateStarRating(selectedRating);
});

starRatingContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("star")) {
        const selectedRating = parseInt(e.target.getAttribute("data-rating"));
        ratingInput.value = selectedRating;
        updateStarRating(selectedRating);
        updateSubmitButtonState(selectedRating);
    }
});

function updateSubmitButtonState(selectedRating) {
    if (selectedRating === 0) {
        submitReviewButton.disabled = true;
    } else {
        submitReviewButton.disabled = false; 
    }
}

updateSubmitButtonState(0);

reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const rating = parseInt(ratingInput.value); 
    const comment = document.getElementById("review-comment").value;
    const timestamp = new Date().toISOString();

    const review = {
        rating,
        comment,
        timestamp
    };

    reviews.push(review);
    saveReviewToLocalStorage(reviews);

    renderReviews(reviews);

    reviewForm.reset();
    updateStarRating(0);
    updateSubmitButtonState(0);

});

function renderReviews(reviews) {
    reviewsContainer.innerHTML = "";

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const reviewDate = new Date(review.timestamp); 
        const formattedDate = reviewDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        function generateStarIcons(rating) {
            const starIcons = Array.from({ length: rating }, (_, index) => {
                const starIcon = document.createElement("span");
                starIcon.textContent = "★";
                starIcon.classList.add("star");
                starIcon.style.color = "--primary-color";
                starIcon.style.fontSize = "25px";
                return starIcon;
            });
            return starIcons;
        }

        const rating = review.rating;
        const starIcons = generateStarIcons(rating);

        starIcons.forEach((star) => {
            reviewCard.appendChild(star);
        });

        reviewCard.innerHTML += `
            <br>${review.comment}<br><br>
            ${formattedDate}<br>
        `;

        reviewsContainer.appendChild(reviewCard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    reviews = loadReviewsFromLocalStorage();
    renderReviews(reviews);
});