import React, { useState, useEffect, useCallback } from 'react';
import '../styles/home.css';
import Sort from '../components/Home/Sort';
import Filter from '../components/Home/Filter';
import Search from '../components/Home/Search';
import ItemGrid from '../components/Home/ItemGrid';

const itemsData = [
    { id: 1, name: 'Ghost of Tsushima', tag: 'Ghost_of_Tsushima', price: 49.99, category: 'Action' },
    { id: 2, name: 'Sons of the Forest', tag: 'sons_of_the_forest', price: 29.99, category: 'Adventure' },
    { id: 3, name: 'Red Dead Redemption II', tag: 'rdr2', price: 59.99, category: 'Action' },
    { id: 4, name: 'The Last of Us Part I', tag: 'the_last_of_us_part1', price: 59.99, category: 'Action' },
    { id: 5, name: 'The Last of Us Part II', tag: 'the_last_of_us_part2', price: 69.99, category: 'Action' },
    { id: 6, name: 'Watch Dogs Legion', tag: 'watch_dogs_legion', price: 49.99, category: 'Action' },
    { id: 7, name: 'Counter-Strike: Global Offensive', tag: 'csgo', price: 14.29, category: 'First-person shooter' },
    { id: 8, name: 'Resident Evil Village', tag: 'resident_evil_village', price: 39.99, category: 'Action' },
    { id: 9, name: 'Resident Evil 4', tag: 'Resident_Evil4', price: 41.99, category: 'Action' },
    { id: 10, name: 'Grand Theft Auto V', tag: 'gtaV', price: 19.99, category: 'Action' },
    { id: 11, name: 'Hogwarts Legacy', tag: 'hogwarts_legacy', price: 43.75, category: 'Adventure' },
    { id: 12, name: 'Far Cry 6', tag: 'far_cry6', price: 65.49, category: 'Action' },
    { id: 13, name: 'Hitman: World of Assassination', tag: 'hitman', price: 69.99, category: 'Action' },
    { id: 14, name: 'Assassin’s Creed Valhalla', tag: 'assassins_creed_valhalla', price: 67.89, category: 'Action' },
    { id: 15, name: 'Call of Duty: Modern Warfare 2', tag: 'cod_mw2', price: 79.99, category: 'First-person shooter' }
];

const Store = () => {
    const [items, setItems] = useState(itemsData);
    const [originalItems] = useState(itemsData);
    const [sortOption, setSortOption] = useState('Default');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const sortItems = useCallback((option) => {
        let sortedItems = [...items];
        switch (option) {
            case 'AtoZ':
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'ZtoA':
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'LowToHigh':
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case 'HighToLow':
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                return;
        }
        setItems(sortedItems);
    }, [items]);

    useEffect(() => {
        if (sortOption !== 'Default') {
            sortItems(sortOption);
        }
    }, [sortOption, sortItems]);

    useEffect(() => {
        let filteredItems = [...originalItems];

        if (searchTerm !== '') {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory !== '') {
            filteredItems = filteredItems.filter(item =>
                item.category === filterCategory
            );
        }

        setItems(filteredItems);
    }, [searchTerm, filterCategory, originalItems]);

    return (
        <div>
            <div className="sort-filter-container">
                <Sort sortOption={sortOption} setSortOption={setSortOption} />
                <Filter categoryFilter={setFilterCategory} />
            </div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ItemGrid items={items} searchTerm={searchTerm} />
        </div>
    );
};

export default Store;
