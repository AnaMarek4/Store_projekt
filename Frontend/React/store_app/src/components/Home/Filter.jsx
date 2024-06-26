import React from 'react';

const Filter = ({ categoryFilter }) => {
    const handleCategoryChange = (event) => {
        categoryFilter(event.target.value);
    };

    return (
        <div className="categories">
            <span>Filter by: </span>
            <select id="category" onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="First-person shooter">First-person shooter</option>
            </select>
        </div>
    );
};

export default Filter;
