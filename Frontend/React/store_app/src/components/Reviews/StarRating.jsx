import React, { Component } from "react";

class StarRating extends Component {
    constructor(props)
    {
        super(props);
        this.state = { hoverRating: 0 };
    }

    handleMouseOver = (rating) => {
        this.setState({ hoverRating: rating });
    };

    handleMouseOut = () => {
        this.setState({ hoverRating: 0 });
    };

    handleClick = (rating) => {
        const { setRating } = this.props;
        setRating(rating);
    };

    renderStars = () => {
        const { rating } = this.props;
        const { hoverRating } = this.state;
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className="star"
                    onMouseOver={() => this.handleMouseOver(i)}
                    onMouseOut={this.handleMouseOut}
                    onClick={() => this.handleClick(i)}
                >
                    {i <= (hoverRating || rating) ? "★" : "☆"}
                </span>
            );
        }
        return stars;
    };

    render()
    {
        return <div className="star-rating">{this.renderStars()}</div>;
    }
};

export default StarRating;