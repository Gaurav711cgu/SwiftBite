import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({ category }) => {
  const { food_list, isLoading } = useContext(StoreContext);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const filtered = food_list
    .filter(item => (category === "All" || category === item.category))
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-header'>
        <h2>Top dishes near you</h2>
        <div className='food-display-controls'>
          <div className='search-bar'>
            <span className='search-icon-inline'>🔍</span>
            <input
              type='text'
              placeholder='Search dishes...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <span className='search-clear' onClick={() => setSearch('')}>✕</span>}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className='sort-select'>
            <option value='default'>Sort: Default</option>
            <option value='low'>Price: Low to High</option>
            <option value='high'>Price: High to Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className='food-display-list'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='skeleton-card'>
              <div className='skeleton-img'></div>
              <div className='skeleton-body'>
                <div className='skeleton-line'></div>
                <div className='skeleton-line short'></div>
                <div className='skeleton-line price'></div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className='food-display-empty'>
          <p>😕 No dishes found{search ? ` for "${search}"` : ''}.</p>
          {search && <button onClick={() => setSearch('')}>Clear Search</button>}
        </div>
      ) : (
        <div className='food-display-list'>
          {filtered.map(item => (
            <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodDisplay
