import React, { useContext, useEffect, useState } from 'react'
import './AdminPages.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminFoodList = () => {
  const { url } = useContext(StoreContext);
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) setList(res.data.data);
    } catch { toast.error("Fetch error"); }
    finally { setLoading(false); }
  };

  const removeFood = async (id) => {
    try {
      const res = await axios.post(`${url}/api/food/remove`, { id });
      if (res.data.success) { toast.success("Item removed"); fetchList(); }
    } catch { toast.error("Remove error"); }
  };

  useEffect(() => { fetchList(); }, []);

  const getImg = img => img && (img.startsWith('http') ? img : `${url}/images/${img}`);

  const filtered = list.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='admin-page'>
      <div className='admin-page-header'>
        <div>
          <h1>📋 Food Menu</h1>
          <p>{list.length} items in the menu</p>
        </div>
        <div className='admin-search'>
          <span>🔍</span>
          <input placeholder='Search items...' value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className='admin-list-grid'>
          {[...Array(6)].map((_,i) => <div key={i} className='food-card-skeleton'></div>)}
        </div>
      ) : (
        <div className='admin-list-grid'>
          {filtered.map(item => (
            <div key={item._id} className='admin-food-card'>
              <img src={getImg(item.image)} alt={item.name} />
              <div className='admin-food-info'>
                <span className='food-cat-badge'>{item.category}</span>
                <h3>{item.name}</h3>
                <p className='food-desc'>{item.description}</p>
                <div className='food-card-footer'>
                  <span className='food-price'>${item.price}</span>
                  <button className='remove-btn' onClick={() => removeFood(item._id)}>🗑️ Remove</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className='no-data'>No items found.</p>}
        </div>
      )}
    </div>
  )
}

export default AdminFoodList
