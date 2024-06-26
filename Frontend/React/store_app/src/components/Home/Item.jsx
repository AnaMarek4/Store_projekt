import React from 'react';

const Item = ({ item }) => {
    return (
        <div className="item">
            <img src={`../images/${item.tag}.jpg`} alt={item.name} />
            <h1>{item.name}</h1>
            <p>{item.category}</p>
            <p>{item.price} €</p>
        </div>
    );
};

export default Item;
