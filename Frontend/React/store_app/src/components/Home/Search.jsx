import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search..." 
            />
            <button onClick={() => setSearchTerm('')}>Reset</button>
        </div>
    );
};

export default Search;
