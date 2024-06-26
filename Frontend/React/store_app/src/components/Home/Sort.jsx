import React from 'react';

const Sort = ({ sortOption, setSortOption }) => {
    return (
        <div className="filter-condition">
            <span>Sort by: </span>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="Default">Default</option>
                <option value="AtoZ">Name: A to Z</option>
                <option value="ZtoA">Name: Z to A</option>
                <option value="LowToHigh">Price: Low to high</option>
                <option value="HighToLow">Price: High to low</option>
            </select>
        </div>
    );
};

export default Sort;
