import React from 'react';

const ItemGrid = ({ items, searchTerm }) => {
    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
        );
    };

    return (
        <div className="items-grid">
            {items.map(item => (
                <div key={item.id} className="item">
                    <img src={`path/to/images/${item.tag}.jpg`} alt={item.name} />
                    <h3>{highlightText(item.name, searchTerm)}</h3>
                    <p>{item.category}</p>
                    <p>{item.price} €</p>
                </div>
            ))}
        </div>
    );
};

export default ItemGrid;
